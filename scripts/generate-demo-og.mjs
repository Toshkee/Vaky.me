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
];

await Promise.all(
  cards.map(({ file, svg }) =>
    sharp(Buffer.from(svg)).png().toFile(file),
  ),
);
