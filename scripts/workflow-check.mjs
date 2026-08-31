/**
 * End-to-end check of the studio workflow, against a real Worker.
 *
 *   npm run build && node scripts/workflow-check.mjs [--reset]
 *
 * It drives the whole path a client and the studio actually take — enquiry,
 * login, convert, private link, brief, build brief — through `wrangler pages
 * dev`, with a local D1 and a local R2. Nothing is mocked: if an endpoint,
 * a migration or a status transition is wrong, this fails.
 *
 * The onboarding answers are not hardcoded. They are synthesised from
 * `schema.ts` by asking the schema's own validator what is still missing and
 * filling exactly that, so adding or removing a question cannot silently rot
 * this file. `--reset` throws the local database away first, which is what to
 * reach for when a migration changed.
 *
 * Exit code 1 if any check fails, so CI can gate on it.
 */
import { spawn } from "node:child_process";
import { rm } from "node:fs/promises";
import {
  questionMax,
  stepErrors,
  visibleQuestions,
  visibleSteps,
} from "../src/lib/onboarding/schema.ts";

const PORT = 8799;
const BASE = `http://127.0.0.1:${PORT}`;
const PASSWORD = "local-check-password";
const SECRET = "local-check-secret-value-not-a-real-one";
const reset = process.argv.includes("--reset");

let failed = 0;
const ok = (name, detail = "") => console.log(`  PASS  ${name}${detail ? ` — ${detail}` : ""}`);
const bad = (name, detail) => {
  failed++;
  console.log(`  FAIL  ${name} — ${detail}`);
};
const check = (name, condition, detail = "") => (condition ? ok(name) : bad(name, detail));

/* ── Answers, synthesised from the schema ─────────────────────────────── */

const allowedOptions = (question, packageId) =>
  (question.options ?? []).filter(
    (option) => !option.packages || option.packages.includes(packageId),
  );

function sample(question, packageId) {
  switch (question.kind) {
    case "single": {
      const [first] = allowedOptions(question, packageId);
      return first ? first.value : "";
    }
    case "multi": {
      const picks = allowedOptions(question, packageId).filter((option) => !option.exclusive);
      const max = questionMax(question, packageId) ?? picks.length;
      return picks.slice(0, Math.max(1, Math.min(1, max))).map((option) => option.value);
    }
    case "urls":
      return ["https://example.com"];
    case "files":
      return [];
    default: {
      if (question.format === "email") return "provjera@example.com";
      if (question.format === "phone") return "+382 67 123 456";
      if (question.format === "url") return "https://example.com";
      const text = `Provjera toka — ${question.id}`;
      return question.maxLength ? text.slice(0, question.maxLength) : text;
    }
  }
}

/** Fills only what the schema itself still objects to, until it stops
 *  objecting. Answering a question can reveal another one, hence the loop. */
function answersFor(packageId) {
  const answers = {};
  for (let pass = 0; pass < 10; pass += 1) {
    let changed = false;
    for (const step of visibleSteps(packageId, answers)) {
      for (const id of Object.keys(stepErrors(step, packageId, answers))) {
        const question = visibleQuestions(step, packageId, answers).find((q) => q.id === id);
        if (!question) continue;
        answers[id] = sample(question, packageId);
        changed = true;
      }
    }
    if (!changed) return answers;
  }
  throw new Error("could not synthesise a complete answer set from the schema");
}

/* ── What the schema promises about Start ─────────────────────────────── */

function checkStartSchema() {
  console.log("\nSchema — Start is one page");
  const answers = answersFor("start");
  const asked = new Set(
    visibleSteps("start", answers).flatMap((step) =>
      visibleQuestions(step, "start", answers).map((question) => question.id),
    ),
  );

  check("Start is never asked how many pages", !asked.has("pages") && !asked.has("pagesOther"));
  check("Start picks sections instead", asked.has("sections"));
  check("Start is not walked through the shop battery", !asked.has("productCount"));
  check("Start is not asked to design a booking system", !asked.has("bookingStaff"));

  const business = answersFor("business");
  const businessAsked = new Set(
    visibleSteps("business", business).flatMap((step) =>
      visibleQuestions(step, "business", business).map((question) => question.id),
    ),
  );
  check("Biznis is asked for pages, not sections", businessAsked.has("pages") && !businessAsked.has("sections"));
}

/* ── The server ───────────────────────────────────────────────────────── */

function run(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { shell: true, stdio: "pipe" });
    let output = "";
    child.stdout.on("data", (chunk) => (output += chunk));
    child.stderr.on("data", (chunk) => (output += chunk));
    child.on("close", (code) => resolve({ code, output }));
  });
}

async function migrate() {
  for (const file of ["migrations/0001_onboarding.sql", "migrations/0002_workflow.sql"]) {
    const { code, output } = await run("npx", [
      "wrangler",
      "d1",
      "execute",
      "vibelab-onboarding",
      "--local",
      "-c",
      "wrangler.local.jsonc",
      "--file",
      file,
    ]);
    /* 0002 is not idempotent, so a second run against a database that already
       has it is expected to complain. What is not expected is a fresh database
       refusing 0001. */
    if (code !== 0 && !/already exists|duplicate column/i.test(output)) {
      throw new Error(`${file} failed:\n${output.slice(-800)}`);
    }
  }
}

function startServer() {
  const child = spawn(
    "npx",
    [
      "wrangler",
      "pages",
      "dev",
      "out",
      "--port",
      String(PORT),
      "--ip",
      "127.0.0.1",
      "--d1=DB=vibelab-onboarding",
      "--r2=UPLOADS",
      "--compatibility-date=2026-08-30",
      `--binding=ONBOARDING_TOKEN_SECRET=${SECRET}`,
      `--binding=ADMIN_PASSWORD=${PASSWORD}`,
    ],
    { shell: true, stdio: "pipe" },
  );

  const ready = new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("wrangler did not start in 90s")), 90_000);
    const watch = (chunk) => {
      if (/Ready on http/i.test(String(chunk))) {
        clearTimeout(timer);
        resolve();
      }
    };
    child.stdout.on("data", watch);
    child.stderr.on("data", watch);
    child.on("close", (code) => {
      clearTimeout(timer);
      reject(new Error(`wrangler exited with code ${code}`));
    });
  });

  return { child, ready };
}

/* ── Talking to it ────────────────────────────────────────────────────── */

let cookie = "";

async function api(path, init = {}) {
  const headers = { ...(init.headers ?? {}) };
  if (init.body) headers["Content-Type"] = "application/json";
  if (cookie) headers.Cookie = cookie;

  const response = await fetch(`${BASE}${path}`, { ...init, headers, redirect: "manual" });
  const set = response.headers.get("set-cookie");
  if (set) cookie = set.split(";")[0];

  let body = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }
  return { status: response.status, body };
}

async function main() {
  checkStartSchema();

  if (reset) await rm(".wrangler/state", { recursive: true, force: true });
  console.log("\nPreparing the local database…");
  await migrate();

  console.log("Starting wrangler…");
  const server = startServer();
  await server.ready;

  try {
    console.log("\nPublic enquiry");
    const lead = await api("/api/lead", {
      method: "POST",
      body: JSON.stringify({
        name: "Provjera Toka",
        businessName: "Konoba Provjera",
        email: "provjera@example.com",
        phone: "+382 67 123 456",
        need: "new-site",
        message: "Automatska provjera.",
        language: "me",
      }),
    });
    check("an enquiry is accepted", lead.status === 200, `status ${lead.status}`);

    const bot = await api("/api/lead", {
      method: "POST",
      body: JSON.stringify({ name: "Bot", email: "bot@example.com", website: "http://spam" }),
    });
    check("the honeypot answers 200 and stores nothing", bot.status === 200, `status ${bot.status}`);

    const noName = await api("/api/lead", {
      method: "POST",
      body: JSON.stringify({ name: "", email: "not-an-email" }),
    });
    check("an enquiry with no name or email is refused", noName.status === 400, `status ${noName.status}`);

    console.log("\nAdmin");
    const closed = await api("/api/admin/leads");
    check("the dashboard is closed without a cookie", closed.status === 401, `status ${closed.status}`);

    const wrong = await api("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password: "not-the-password" }),
      headers: { Origin: BASE },
    });
    check("a wrong password is refused", wrong.status === 401, `status ${wrong.status}`);

    const login = await api("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password: PASSWORD }),
      headers: { Origin: BASE },
    });
    check("the right password logs in", login.status === 200 && Boolean(cookie), `status ${login.status}`);

    const leads = await api("/api/admin/leads");
    const stored = leads.body?.leads ?? [];
    check("the enquiry is in the dashboard", stored.some((row) => row.email === "provjera@example.com"));
    check(
      "the honeypot enquiry is not",
      !stored.some((row) => row.email === "bot@example.com"),
      `${stored.length} leads stored`,
    );

    const leadId = stored.find((row) => row.email === "provjera@example.com")?.id;
    if (!leadId) throw new Error("no lead to convert");

    console.log("\nProject and private link");
    const converted = await api(`/api/admin/leads/${leadId}/convert`, {
      method: "POST",
      body: JSON.stringify({ packageId: "start" }),
      headers: { Origin: BASE },
    });
    const projectId = converted.body?.projectId;
    check("the lead becomes a project", converted.status === 200 && Boolean(projectId), `status ${converted.status}`);

    const again = await api(`/api/admin/leads/${leadId}/convert`, {
      method: "POST",
      body: JSON.stringify({ packageId: "business" }),
      headers: { Origin: BASE },
    });
    check("the same lead cannot become a second project", again.status === 409, `status ${again.status}`);

    const link = await api(`/api/admin/projects/${projectId}/onboarding`, {
      method: "POST",
      headers: { Origin: BASE },
    });
    const url = link.body?.url ?? "";
    const token = url.split("/").filter(Boolean).pop() ?? "";
    check("an onboarding link is minted", Boolean(token), `url ${url || "(none)"}`);

    console.log("\nThe client's side");
    const nonsense = await fetch(`${BASE}/api/onboarding/context`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }),
    });
    check("an invented token is refused", nonsense.status === 404, `status ${nonsense.status}`);

    const context = await fetch(`${BASE}/api/onboarding/context`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }).then((response) => response.json());
    check("the link resolves to the agreed package", context.packageId === "start", `got ${context.packageId}`);
    check("and to what the studio already knows", context.project?.email === "provjera@example.com");

    const session = await fetch(`${BASE}/api/onboarding/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    check("the link opens an upload session", session.status === 200, `status ${session.status}`);

    const short = await fetch(`${BASE}/api/onboarding/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, language: "me", answers: { businessName: "Samo ovo" } }),
    });
    check("an incomplete brief is refused", short.status === 422, `status ${short.status}`);

    const submitted = await fetch(`${BASE}/api/onboarding/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, language: "me", answers: answersFor("start") }),
    });
    check("a complete brief is accepted", submitted.status === 200, `status ${submitted.status}`);

    const reused = await fetch(`${BASE}/api/onboarding/context`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    check("the link is spent once used", reused.status === 409, `status ${reused.status}`);

    console.log("\nBuild brief");
    const detail = await api(`/api/admin/projects/${projectId}`);
    check(
      "the answers reach the project",
      Boolean(detail.body?.submission?.answers?.businessName),
      "no submission on the project",
    );
    check(
      "the project moved to 'upitnik popunjen'",
      detail.body?.project?.status === "onboarding_completed",
      `status ${detail.body?.project?.status}`,
    );

    const brief = await api(`/api/admin/projects/${projectId}/brief`, {
      method: "POST",
      body: JSON.stringify({ mode: "full" }),
      headers: { Origin: BASE },
    });
    const content = brief.body?.content ?? "";
    check("a build brief is generated", brief.status === 200 && content.length > 200, `status ${brief.status}`);
    check("and it says the site is one page", /ONE-PAGE WEBSITE/.test(content));
    check("and it never invents a price", !/€350/.test(content));

    console.log("\nStatic routes");
    const form = await fetch(`${BASE}/start/${token}/`, { redirect: "manual" });
    check("a token path serves the form shell", form.status === 200, `status ${form.status}`);
    check("and asks not to be indexed", form.headers.get("x-robots-tag") === "noindex");

    const info = await fetch(`${BASE}/start/nonsense/`, { redirect: "manual" });
    check("a nonsense path goes to the explanation", info.status === 302, `status ${info.status}`);

    const admin = await fetch(`${BASE}/admin/`);
    check("the dashboard page loads", admin.status === 200, `status ${admin.status}`);
  } finally {
    server.child.kill();
  }
}

try {
  await main();
} catch (error) {
  bad("workflow check", error.message);
}

console.log(failed ? `\n${failed} failed.` : "\nAll checks passed.");
process.exit(failed ? 1 : 0);
