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
      <rect width="1200" height="630" fill="#101216"/><rect x="74" y="74" width="18" height="482" fill="#d8ff26"/>
      <text x="132" y="154" fill="#d8ff26" font-family="Arial, sans-serif" font-size="27" font-weight="700" letter-spacing="8">DIZAJN KONCEPT · PODGORICA</text>
      <text x="126" y="330" fill="#fff" font-family="Impact, Arial Black, sans-serif" font-size="150" letter-spacing="3">TITAN</text>
      <text x="126" y="468" fill="#d8ff26" font-family="Impact, Arial Black, sans-serif" font-size="116">GYM</text>
      <path d="M726 235h355M726 315h265M726 395h310" stroke="#fff" stroke-opacity=".32" stroke-width="3"/>
      <text x="126" y="548" fill="#b6bbc3" font-family="Arial, sans-serif" font-size="29">Kuj svoju formu.</text>
    </svg>`,
  },
  {
    file: "public/og-demo-konoba-skadar.png",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="1200" height="630" fill="#162a29"/><path d="M0 440C220 360 420 510 650 425s370-70 550 5v200H0Z" fill="#244442"/>
      <circle cx="945" cy="152" r="92" fill="#c4682f" fill-opacity=".9"/><path d="M66 77h1068v476H66z" fill="none" stroke="#f4ead5" stroke-opacity=".52" stroke-width="3"/>
      <text x="600" y="158" text-anchor="middle" fill="#f4ead5" font-family="Georgia, serif" font-size="26" letter-spacing="7">VIRPAZAR · SKADARSKO JEZERO</text>
      <text x="600" y="308" text-anchor="middle" fill="#f4ead5" font-family="Georgia, serif" font-size="98">Konoba Skadar</text>
      <path d="M455 350h290" stroke="#c4682f" stroke-width="5"/>
      <text x="600" y="412" text-anchor="middle" fill="#f4ead5" font-family="Georgia, serif" font-size="37" font-style="italic">Domaća kuhinja uz jezero</text>
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
