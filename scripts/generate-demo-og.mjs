import sharp from "sharp";

const width = 1200;
const height = 630;
const drinaLogo = await sharp("public/barber-drina-logo.jpg")
  .resize(520, 520)
  .jpeg({ quality: 92 })
  .toBuffer();
const drinaLogoData = drinaLogo.toString("base64");

const cards = [
  {
    file: "public/og-demo-titan-gym.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#0c0d0e"/>
      <path d="M0 0h1200v26H0z" fill="#ff5a1f"/><path d="M0 604h1200v26H0z" fill="#ff5a1f"/>
      <text x="126" y="170" fill="#ff5a1f" font-family="Arial, sans-serif" font-size="27" font-weight="700" letter-spacing="8">TERETANA · PODGORICA</text>
      <text x="120" y="352" fill="#fff" font-family="Impact, Arial Black, sans-serif" font-size="170" letter-spacing="3">TITAN<tspan fill="#ff5a1f">.</tspan></text>
      <text x="126" y="470" fill="#ff5a1f" font-family="Impact, Arial Black, sans-serif" font-size="64" letter-spacing="2">SNAGA SE GRADI. DANAS.</text>
      <text x="126" y="545" fill="#b6bbc3" font-family="Arial, sans-serif" font-size="29">06–23 · Bez ugovorne obaveze</text>
    </svg>`,
  },
  {
    file: "public/og-demo-konoba-skadar.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#101d24"/><path d="M0 440C220 360 420 510 650 425s370-70 550 5v200H0Z" fill="#16272f"/>
      <circle cx="945" cy="152" r="92" fill="#dfa15c" fill-opacity=".85"/><path d="M66 77h1068v476H66z" fill="none" stroke="#f2e9d8" stroke-opacity=".5" stroke-width="3"/>
      <text x="600" y="158" text-anchor="middle" fill="#dfa15c" font-family="Georgia, serif" font-size="26" letter-spacing="7">VIRPAZAR · SKADARSKO JEZERO</text>
      <text x="600" y="308" text-anchor="middle" fill="#f2e9d8" font-family="Georgia, serif" font-size="98">Konoba Skadar</text>
      <path d="M455 350h290" stroke="#dfa15c" stroke-width="5"/>
      <text x="600" y="412" text-anchor="middle" fill="#f2e9d8" font-family="Georgia, serif" font-size="37" font-style="italic">Sto uz jezero. Ukusi koji ostaju.</text>
    </svg>`,
  },
  {
    file: "public/og-demo-barbershop-stari-grad.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#f5efe4"/><rect x="61" y="61" width="1078" height="508" fill="none" stroke="#16382b" stroke-width="3"/><rect x="78" y="78" width="1044" height="474" fill="none" stroke="#b08d3e" stroke-width="2"/>
      <path d="M602 153l22 40-22 40-22-40z" fill="#a4342c"/><path d="M391 351h418" stroke="#b08d3e" stroke-width="3"/>
      <text x="600" y="285" text-anchor="middle" fill="#a4342c" font-family="Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="12">BARBERSHOP</text>
      <text x="600" y="428" text-anchor="middle" fill="#16382b" font-family="Georgia, serif" font-size="101">Stari Grad</text>
      <text x="600" y="495" text-anchor="middle" fill="#16382b" font-family="Arial, sans-serif" font-size="24" letter-spacing="6">STARA VAROŠ · PODGORICA</text>
    </svg>`,
  },
  {
    file: "public/og-demo-barber-drina.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#000"/>
      <rect x="42" y="42" width="1116" height="546" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2"/>
      <image href="data:image/jpeg;base64,${drinaLogoData}" x="55" y="55" width="520" height="520"/>
      <path d="M610 80v470" stroke="#fff" stroke-opacity=".22" stroke-width="2"/>
      <text x="655" y="150" fill="#fff" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="5">STARI AERODROM · PODGORICA</text>
      <text x="655" y="255" fill="#fff" font-family="Arial Black, Arial, sans-serif" font-size="66" font-weight="900">TERMIN U</text>
      <text x="655" y="330" fill="#fff" font-family="Arial Black, Arial, sans-serif" font-size="66" font-weight="900">INSTAGRAM</text>
      <text x="655" y="405" fill="#fff" font-family="Arial Black, Arial, sans-serif" font-size="66" font-weight="900">DM-U.</text>
      <path d="M655 444h445" stroke="#fff" stroke-opacity=".3" stroke-width="2"/>
      <text x="655" y="505" fill="#fff" fill-opacity=".65" font-family="Arial, sans-serif" font-size="23" letter-spacing="3">PON–SUB · 09–21H</text>
      <text x="655" y="550" fill="#fff" fill-opacity=".65" font-family="Arial, sans-serif" font-size="23" letter-spacing="3">@BARBER_DRINA</text>
    </svg>`,
  },
  /* ── Outreach concepts ────────────────────────────────────────────
     These four are unlisted, noindex pages sent to a business by link, so
     the card has one job the others do not: say "dizajn koncept" before
     anyone assumes they are looking at the company's official site. Each
     one borrows its own page's ground, accent and letterform. */
  {
    file: "public/og-demo-soul-studio.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#f4eee8"/>
      <path d="M760 630V300a170 170 0 0 1 340 0v330Z" fill="#e0d0c4"/>
      <path d="M100 168h560" stroke="#b86f5c" stroke-width="2"/>
      <text x="100" y="140" fill="#8f4a39" font-family="Arial, sans-serif" font-size="21" letter-spacing="7">YOGA &amp; REFORMER PILATES · PODGORICA</text>
      <text x="100" y="288" fill="#171411" font-family="Georgia, serif" font-size="82">Pokret. Disanje.</text>
      <text x="100" y="378" fill="#b86f5c" font-family="Georgia, serif" font-size="82" font-style="italic">Prisustvo.</text>
      <text x="100" y="452" fill="#5a5049" font-family="Arial, sans-serif" font-size="26">Crnogorskih Serdara 45, Podgorica</text>
      <path d="M100 512h560" stroke="#171411" stroke-opacity=".2" stroke-width="1"/>
      <text x="100" y="556" fill="#171411" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="6">DIZAJN KONCEPT · VAKY</text>
    </svg>`,
  },
  {
    file: "public/og-demo-kraftart.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#efe9df"/>
      <rect x="0" y="0" width="1200" height="14" fill="#090909"/>
      <rect x="0" y="616" width="1200" height="14" fill="#090909"/>
      <rect x="836" y="14" width="364" height="602" fill="#e5ded1"/>
      <path d="M896 120v390M956 90v450M1016 140v340M1076 110v420" stroke="#090909" stroke-width="7" stroke-linecap="round"/>
      <text x="96" y="146" fill="#8e302c" font-family="Courier New, monospace" font-size="21" letter-spacing="5">TATTOO &amp; PIERCING STUDIO · PODGORICA</text>
      <text x="92" y="300" fill="#090909" font-family="Arial Black, Arial, sans-serif" font-size="92" font-weight="900">DOĐITE DA</text>
      <text x="92" y="392" fill="#090909" font-family="Arial Black, Arial, sans-serif" font-size="92" font-weight="900">SE CRTAMO.</text>
      <path d="M96 448h620" stroke="#8e302c" stroke-width="6"/>
      <text x="96" y="502" fill="#69645e" font-family="Courier New, monospace" font-size="23" letter-spacing="2">SARAJEVSKA 53, MASLINE, PODGORICA</text>
      <text x="96" y="556" fill="#090909" font-family="Courier New, monospace" font-size="23" letter-spacing="4">DIZAJN KONCEPT · VAKY</text>
    </svg>`,
  },
  {
    file: "public/og-demo-lavlav.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#f2eee5"/>
      <rect x="0" y="0" width="26" height="630" fill="#c81d31"/>
      <circle cx="1000" cy="315" r="184" fill="#e8e2d6"/>
      <text x="1000" y="286" text-anchor="middle" fill="#111" font-family="Georgia, serif" font-size="58" letter-spacing="14">LAV</text>
      <text x="1000" y="360" text-anchor="middle" fill="#5c5751" font-family="Georgia, serif" font-size="58" letter-spacing="14">LAV</text>
      <text x="104" y="140" fill="#5c5751" font-family="Arial, sans-serif" font-size="20" letter-spacing="8">NAILS · BROWS · LASHES · PODGORICA</text>
      <text x="104" y="284" fill="#111" font-family="Georgia, serif" font-size="64">Više od 200 nijansi.</text>
      <text x="104" y="364" fill="#111" font-family="Georgia, serif" font-size="64">Termin biraš online.</text>
      <text x="104" y="436" fill="#5c5751" font-family="Arial, sans-serif" font-size="25">Master kvart · Online rezervacija</text>
      <path d="M104 492h560" stroke="#c81d31" stroke-width="3"/>
      <text x="104" y="546" fill="#111" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="6">DIZAJN KONCEPT · VAKY</text>
    </svg>`,
  },
  /* ── Second outreach wave (avgust 2026) ──────────────────────────
     Same job as the four above: unlisted noindex concepts, so every card
     says "DIZAJN KONCEPT" and borrows its own page's ground, accent and
     letterform logic. */
  {
    /* Telo: butter ground, lowercase Caslon-like stagger, carriage rail+arc. */
    file: "public/og-demo-telo-pilates.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#FAFBD4"/>
      <text x="96" y="118" fill="#6B6C5C" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="7">REFORMER PILATES · PODGORICA</text>
      <text x="96" y="248" fill="#131309" font-family="Georgia, serif" font-size="92">kontrola.</text>
      <text x="146" y="342" fill="#131309" font-family="Georgia, serif" font-size="92">snaga.</text>
      <text x="196" y="436" fill="#131309" font-family="Georgia, serif" font-size="92">pokret.</text>
      <path d="M96 512h1008" stroke="#131309" stroke-opacity=".28" stroke-width="2"/>
      <path d="M132 512v-12M1068 512v-12" stroke="#131309" stroke-width="3"/>
      <path d="M132 512C400 448 780 448 1052 506" stroke="#131309" stroke-width="4" fill="none"/>
      <circle cx="1052" cy="506" r="9" fill="#131309"/>
      <text x="96" y="576" fill="#6B6C5C" font-family="Arial, sans-serif" font-size="23">Vektra, Podgorica · Rezervacija bez suvišnih koraka</text>
      <text x="700" y="576" fill="#131309" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="6">DIZAJN KONCEPT · VAKY</text>
    </svg>`,
  },
  {
    /* Dental: mineral sheet, ruled left margin, report contents row. */
    file: "public/og-demo-dental-clinic-kovacevic.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#f2f5f6"/>
      <path d="M72 60v510" stroke="#0f6e72" stroke-width="3"/>
      <path d="M96 96h1008" stroke="#12263a" stroke-width="2"/>
      <text x="96" y="150" fill="#0f6e72" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="6">STOMATOLOŠKA ORDINACIJA · IGALO &amp; ZELENIKA</text>
      <text x="96" y="286" fill="#12263a" font-family="Georgia, serif" font-size="84">Tri doktora.</text>
      <text x="96" y="380" fill="#12263a" font-family="Georgia, serif" font-size="84">Dvije lokacije.</text>
      <text x="96" y="452" fill="#0f6e72" font-family="Georgia, serif" font-size="40" font-style="italic">Jedan pažljiv pristup.</text>
      <path d="M96 496h1008" stroke="#12263a" stroke-opacity=".25" stroke-width="1"/>
      <text x="96" y="546" fill="#12263a" fill-opacity=".7" font-family="Arial, sans-serif" font-size="22" letter-spacing="3">01 STOMATOLOGIJA · 02 ORALNA HIRURGIJA · 03 ESTETSKI RAD</text>
      <text x="96" y="592" fill="#12263a" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="6">DIZAJN KONCEPT · VAKY</text>
    </svg>`,
  },
  {
    /* Andrea: warm white, arched doorway outlines, one berry italic line. */
    file: "public/og-demo-andrea-beauty-house.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#FBF6F2"/>
      <path d="M868 630V300a150 150 0 0 1 300 0v330" fill="none" stroke="#D9BFB8" stroke-width="3"/>
      <path d="M928 630V352a90 90 0 0 1 180 0v278" fill="none" stroke="#9B2242" stroke-width="2"/>
      <text x="96" y="128" fill="#1B1418" fill-opacity=".65" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="8">BEAUTY HOUSE · NEW CITY, PODGORICA</text>
      <text x="96" y="270" fill="#1B1418" font-family="Georgia, serif" font-size="78">Jedna kuća.</text>
      <text x="96" y="360" fill="#9B2242" font-family="Georgia, serif" font-size="78" font-style="italic">Mnogo načina</text>
      <text x="96" y="450" fill="#1B1418" font-family="Georgia, serif" font-size="78">da budeš svoja.</text>
      <path d="M96 500h120" stroke="#C9A227" stroke-width="4"/>
      <text x="96" y="552" fill="#1B1418" fill-opacity=".7" font-family="Arial, sans-serif" font-size="24" letter-spacing="4">SALON · BRAIDS · KIDS</text>
      <text x="96" y="596" fill="#1B1418" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="6">DIZAJN KONCEPT · VAKY</text>
    </svg>`,
  },
  {
    /* Mila: porcelain masthead, rose rule, carbon mount off the right edge. */
    file: "public/og-demo-studio-ljepote-mila.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#F1F2F4"/>
      <rect x="920" y="0" width="280" height="630" fill="#15171B"/>
      <text x="96" y="112" fill="#15171B" fill-opacity=".6" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="8">STUDIO LJEPOTE · CITY KVART, PODGORICA</text>
      <path d="M96 140h740" stroke="#94505C" stroke-width="3"/>
      <text x="96" y="300" fill="#15171B" font-family="Georgia, serif" font-size="74">Preciznost koja</text>
      <text x="96" y="388" fill="#15171B" font-family="Georgia, serif" font-size="74">ostaje <tspan font-style="italic" fill="#94505C">prirodna.</tspan></text>
      <text x="96" y="486" fill="#15171B" fill-opacity=".7" font-family="Arial, sans-serif" font-size="24" letter-spacing="3">Tretmani · Permanent makeup · Edukacije</text>
      <path d="M96 528h740" stroke="#15171B" stroke-opacity=".2" stroke-width="1"/>
      <text x="96" y="576" fill="#15171B" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="6">DIZAJN KONCEPT · VAKY</text>
      <text x="1060" y="576" text-anchor="middle" fill="#F1F2F4" font-family="Georgia, serif" font-size="30" font-style="italic">Mila</text>
    </svg>`,
  },
  /* ── Third outreach wave (30. avgust 2026) ───────────────────────
     Four more unlisted noindex concepts. Same contract as above: the
     card says "DIZAJN KONCEPT", carries no phone/street/e-mail, and
     borrows only its own page's ground, accent and letterform logic. */
  {
    /* Studio ljepote i zdravlja: ivory ground, olive lens plate, gold hairlines. */
    file: "public/og-demo-studio-ljepote-zdravlja.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#F4EDE0"/>
      <g transform="translate(820,-45) scale(1.2)">
        <path d="M210 6C348 152 348 448 210 594 72 448 72 152 210 6Z" fill="#414A34"/>
        <g fill="none" stroke="#D8BD72" stroke-linecap="round">
          <path d="M210 6V594" stroke-width="2" stroke-opacity=".55"/>
          <path d="M210 74C306 178 306 422 210 526 114 422 114 178 210 74Z" stroke-width="2" stroke-opacity=".42"/>
          <path d="M210 152C266 212 266 388 210 448 154 388 154 212 210 152Z" stroke-width="2" stroke-opacity=".32"/>
          <path d="M210 170C252 196 288 240 312 286" stroke-width="1.6" stroke-opacity=".3"/>
          <path d="M210 170C168 196 132 240 108 286" stroke-width="1.6" stroke-opacity=".3"/>
          <path d="M210 268C250 292 284 330 306 372" stroke-width="1.6" stroke-opacity=".3"/>
          <path d="M210 268C170 292 136 330 114 372" stroke-width="1.6" stroke-opacity=".3"/>
          <path d="M210 366C244 384 272 412 290 444" stroke-width="1.6" stroke-opacity=".3"/>
          <path d="M210 366C176 384 148 412 130 444" stroke-width="1.6" stroke-opacity=".3"/>
        </g>
      </g>
      <text x="88" y="112" fill="#6B5D4E" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="6">NJEGA LICA I TIJELA · ZABJELO, PODGORICA</text>
      <rect x="64" y="196" width="4" height="284" fill="#414A34"/>
      <text x="98" y="268" fill="#2B1F17" font-family="Georgia, serif" font-size="72">Njega koja počinje</text>
      <text x="98" y="352" fill="#2B1F17" font-family="Georgia, serif" font-size="72">slušanjem kože.</text>
      <text x="98" y="446" fill="#6B5D4E" font-family="Arial, sans-serif" font-size="27">Lice · Tijelo · Masaže · Pogled</text>
      <text x="88" y="576" fill="#2B1F17" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="6">DIZAJN KONCEPT · VAKY</text>
    </svg>`,
  },
  {
    /* Pilates by Maja: chalk ground, deep petrol type, clay accent — the
       photo-led editorial redesign. Serif headline (Georgia stand-in for
       Instrument Serif) in sentence case, "Ritam" italic, final period clay. */
    file: "public/og-demo-pilates-by-maja.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#f4f1eb"/>
      <text x="96" y="104" fill="#14302c" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="7">STUDIO PILATES BY MAJA</text>
      <path d="M96 136h1008" stroke="#ddd8ce" stroke-width="1"/>
      <text x="96" y="292" fill="#14302c" font-family="Georgia, 'Times New Roman', serif" font-size="104"><tspan font-style="italic">Ritam</tspan> koji možeš</text>
      <text x="96" y="404" fill="#14302c" font-family="Georgia, 'Times New Roman', serif" font-size="104">da održiš<tspan fill="#d2856c">.</tspan></text>
      <text x="96" y="578" fill="#5c6360" font-family="Arial, sans-serif" font-size="23">Grupni i personalni trening · Podgorica</text>
      <text x="1104" y="578" text-anchor="end" fill="#14302c" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="6">DIZAJN KONCEPT · VAKY</text>
    </svg>`,
  },
  {
    /* Skyline: black ground, mint horizon hairline, the line-weight scale. */
    file: "public/og-demo-skyline-tattoo.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#08090a"/>
      <rect width="1200" height="5" fill="#5CF2C0"/>
      <rect x="700" y="200" width="440" height="3" fill="#5CF2C0"/>
      <rect x="700" y="222" width="370" height="4" fill="#8C9498"/>
      <rect x="700" y="246" width="425" height="6" fill="#8C9498"/>
      <rect x="700" y="274" width="320" height="9" fill="#8C9498"/>
      <rect x="700" y="306" width="440" height="14" fill="#ECEFEE"/>
      <rect x="700" y="344" width="400" height="22" fill="#ECEFEE"/>
      <rect x="700" y="392" width="440" height="35" fill="#ECEFEE"/>
      <text x="96" y="112" fill="#ECEFEE" font-family="Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="14">SKYLINE</text>
      <text x="96" y="256" fill="#ECEFEE" font-family="Arial, sans-serif" font-size="106" letter-spacing="-2">Ideja</text>
      <text x="96" y="358" fill="#ECEFEE" font-family="Arial, sans-serif" font-size="106" letter-spacing="-2">postaje</text>
      <text x="96" y="460" fill="#ECEFEE" font-family="Arial, sans-serif" font-size="106" letter-spacing="-2">trag<tspan fill="#5CF2C0">.</tspan></text>
      <text x="96" y="576" fill="#8C9498" font-family="Arial, sans-serif" font-size="26">Tattoos &amp; Piercing · Podgorica</text>
      <text x="760" y="576" fill="#ECEFEE" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="5">DIZAJN KONCEPT · VAKY</text>
    </svg>`,
  },
];

await Promise.all(
  cards.map(({ file, svg }) =>
    sharp(Buffer.from(svg)).png().toFile(file),
  ),
);
