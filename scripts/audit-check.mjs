/**
 * `npm audit --audit-level=high`, with named exceptions.
 *
 *   node scripts/audit-check.mjs
 *
 * Every advisory at high or critical fails the run, in dev tooling as much as
 * in what ships — except the ones in ALLOWED, each of which says why it is
 * there. An exception is for an advisory with no patched release to move to,
 * on a path that cannot reach it; once npm stops reporting it, the script says
 * so and the entry should go.
 *
 * Exit code 1 if anything else is found, so CI can gate on it.
 */
import { spawnSync } from "node:child_process";

const ALLOWED = {
  /* braces <= 3.0.3, and 3.0.3 is the latest: there is nothing to upgrade to.
     Reached only through eslint-config-next → @next/eslint-plugin-next →
     fast-glob → micromatch, at lint time, on globs we write ourselves. */
  "GHSA-vfj7-8cjw-p6xm": "braces: stack exhaustion on deeply nested patterns",
};

/* npm audit exits 1 whenever it finds anything, so the status says nothing;
   the JSON does. */
const { stdout } = spawnSync("npm", ["audit", "--json"], { encoding: "utf8" });
let report;
try {
  report = JSON.parse(stdout);
} catch {
  console.error("npm audit did not return JSON:\n" + stdout);
  process.exit(1);
}

/* A package that is only vulnerable because of a dependency lists that
   dependency's name in `via`; the advisories themselves are the objects. */
const advisories = new Map();
for (const vulnerability of Object.values(report.vulnerabilities ?? {})) {
  for (const via of vulnerability.via) {
    if (typeof via === "object") advisories.set(via.url.split("/").pop(), via);
  }
}

const failing = [...advisories]
  .filter(([id, via]) => ["high", "critical"].includes(via.severity) && !(id in ALLOWED))
  .map(([id, via]) => `${via.severity}  ${via.name}  ${id}  ${via.title}`);

for (const [id, reason] of Object.entries(ALLOWED)) {
  if (advisories.has(id)) console.log(`allowed  ${id}  ${reason}`);
  else console.log(`no longer reported, remove it from ALLOWED: ${id}`);
}

if (failing.length > 0) {
  console.error(failing.join("\n"));
  process.exit(1);
}
console.log("npm audit: nothing at high or above outside ALLOWED");
