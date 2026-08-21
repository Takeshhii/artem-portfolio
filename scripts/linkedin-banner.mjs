// Renders the LinkedIn profile banner (1584×396) in the site's palette.
// Run: node scripts/linkedin-banner.mjs
import sharp from 'sharp';
import fs from 'node:fs';

// LinkedIn crops the banner behind the avatar on the left and on small screens,
// so everything meaningful stays right of ~430px and vertically centred.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1584" height="396" viewBox="0 0 1584 396">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbfaf8"/>
      <stop offset="55%" stop-color="#f4f0e9"/>
      <stop offset="100%" stop-color="#ece5da"/>
    </linearGradient>
  </defs>

  <rect width="1584" height="396" fill="url(#bg)"/>
  <rect x="0" y="0" width="1584" height="5" fill="#a6532a"/>

  <text x="470" y="150" font-family="JetBrains Mono, Consolas, monospace" font-size="19"
        letter-spacing="5" fill="#a6532a">AI · GROWTH · AUTOMATION · PRODUCT</text>

  <text x="468" y="234" font-family="Georgia, 'Times New Roman', serif" font-size="60" fill="#15171c">
    I build AI-powered growth systems
  </text>
  <text x="468" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="60" fill="#15171c">
    and digital products.
  </text>

  <line x1="470" y1="336" x2="1120" y2="336" stroke="#ddd5c8" stroke-width="1"/>
  <text x="470" y="368" font-family="Inter, Helvetica, Arial, sans-serif" font-size="19" fill="#6b7078">
    tarasov-artem.netlify.app  ·  github.com/Takeshhii
  </text>
</svg>`;

fs.mkdirSync('public/og', { recursive: true });
await sharp(Buffer.from(svg)).png().toFile('public/og/linkedin-banner.png');
console.log('wrote public/og/linkedin-banner.png (1584x396)');
