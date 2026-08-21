// Renders the branded social preview image from an SVG source.
// Run: node scripts/og.mjs
import sharp from 'sharp';
import fs from 'node:fs';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="warm" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbfaf8"/>
      <stop offset="100%" stop-color="#f1ece4"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#warm)"/>
  <rect x="0" y="0" width="1200" height="6" fill="#a6532a"/>

  <text x="80" y="150" font-family="JetBrains Mono, monospace" font-size="20"
        letter-spacing="4" fill="#a6532a">AI · GROWTH · AUTOMATION · PRODUCT</text>

  <text x="80" y="272" font-family="Georgia, serif" font-size="74" fill="#15171c">Artem Tarasov</text>

  <text x="80" y="368" font-family="Inter, Helvetica, Arial, sans-serif" font-size="30" fill="#3c4149">
    I build AI-powered growth systems
  </text>
  <text x="80" y="412" font-family="Inter, Helvetica, Arial, sans-serif" font-size="30" fill="#3c4149">
    and digital products.
  </text>

  <line x1="80" y1="492" x2="1120" y2="492" stroke="#e3ddd3" stroke-width="1"/>
  <text x="80" y="540" font-family="JetBrains Mono, monospace" font-size="19"
        letter-spacing="2" fill="#6b7078">tarasov-artem.netlify.app</text>
  <text x="1120" y="540" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="19"
        letter-spacing="2" fill="#6b7078">github.com/Takeshhii</text>
</svg>`;

fs.mkdirSync('public/og', { recursive: true });
await sharp(Buffer.from(svg)).png().toFile('public/og/default.png');
console.log('wrote public/og/default.png');
