# Sljedeće

Bilješka za nastavak. Stanje na dan 16. septembra 2026. Repo je
`Toshkee/Vaky.me` (preimenovan sa `VibeLab.me`).

## Urađeno 16. septembra: brief za izradu kao pravi prompt

- **Djelatnost na projektu.** `migrations/0003_trade.sql` dodaje
  `projects.trade`. Bira se pri pravljenju projekta, pri pretvaranju upita i
  mijenja na projektu. Endpointi odbijaju nepoznatu vrijednost.
- **`src/lib/build-playbook.ts`**: `STACK`, `TRADE_PLAYBOOK` (sekcije po redu,
  pitanje mušterije, kontakt akcije, tipične greške za svih deset
  djelatnosti), `STYLE_DIRECTIONS` (osam opcija iz upitnika), `ANTI_SLOP`,
  `DONE`. Tip `Trade` je izveden iz rječnika, pa nova trade stranica bez
  playbooka ne prolazi typecheck.
- **Brief za izradu** ima nove sekcije Page Structure, Design System,
  Stack & Delivery i Definition of Done. Concept brief uzima `ANTI_SLOP` iz
  istog fajla. `briefForProject` u `server/admin/brief.ts` koriste i dugme u
  dashboardu i slanje upitnika.
- **Automatski brief.** Slanje upitnika odmah čuva brief na projektu, pa ga
  šalje u mejlu kao `.md` prilog. Pad briefa ili mejla ne ruši slanje.
- `node scripts/workflow-check.mjs --reset` provjerava djelatnost, brief
  odmah poslije upitnika i njegove sekcije. Sve prolazi.

## Migracija 0003 je na produkciji

Primijenjena 16. septembra, poslije deploya. Do tad je prihvatanje upita u
produkciji padalo sa "Nema veze sa serverom", jer kolona `trade` nije
postojala. `wrangler d1 migrations list --remote` sad kaže da nema ništa za
primijeniti. Postojećim projektima djelatnost se bira ručno na projektu.

## I dalje otvoreno

- U produkcijskoj bazi su test upiti **"Pekara Zlatno Zrno (TEST)"** i
  **"Frizerski salon Lana (TEST)"**. Obriši ih iz dashboarda.
- Cloudflare: domeni `vibelab.it.com` i `www` su i dalje vezani za Pages
  projekat `vibelab`. Odluka: skinuti ih, zonu zadržati do isteka kod
  Namecheapa. (Nije rađeno, po dogovoru.)
- Admin panel za klijente (Decap ili Keystatic) kao doplata €80–100 na Biznis.
  Prvo pilot na jednom demo sajtu.
- Sekcija "ko stoji iza Vaky" i dva prava citata klijenata na početnoj.
