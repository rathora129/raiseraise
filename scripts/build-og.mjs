import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const logo = await fs.readFile(path.join(root, 'public/images/brand/raiseraise-logo.svg'), 'utf8');
const inner = logo.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#041713"/>
      <stop offset="0.55" stop-color="#06201B"/>
      <stop offset="1" stop-color="#0A2B24"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.18" r="0.55">
      <stop offset="0" stop-color="#278672" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#278672" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4BC2AC" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#4BC2AC" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#4BC2AC" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g stroke="#F4F6F2" stroke-opacity="0.05">
    ${Array.from({ length: 9 }, (_, i) => `<line x1="${i * 150}" y1="0" x2="${i * 150}" y2="630"/>`).join('')}
  </g>

  <g transform="translate(78, 52) scale(0.42)">${inner}</g>

  <text x="80" y="330" fill="#4BC2AC" font-family="Helvetica Neue, Arial, sans-serif" font-size="16" letter-spacing="6">RAISERAISE ELEVATORS</text>

  <text x="78" y="418" fill="#F4F6F2" font-family="Helvetica Neue, Arial, sans-serif" font-size="74" font-weight="300" letter-spacing="-2">Elevating every journey</text>
  <text x="78" y="496" fill="#F4F6F2" font-family="Helvetica Neue, Arial, sans-serif" font-size="74" font-weight="300" letter-spacing="-2">with safety.</text>

  <rect x="80" y="540" width="420" height="1" fill="url(#rule)"/>

  <text x="80" y="578" fill="#F4F6F2" fill-opacity="0.6" font-family="Helvetica Neue, Arial, sans-serif" font-size="16" letter-spacing="3.4">PASSENGER · HOME · HOSPITAL · GOODS · PANORAMIC</text>

  <text x="1120" y="578" fill="#F4F6F2" fill-opacity="0.38" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="14" letter-spacing="3">CONCEPT VISUALISATION</text>
</svg>`;

await fs.mkdir(path.join(root, 'public/images/og'), { recursive: true });
await sharp(Buffer.from(svg)).jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(root, 'public/images/og/og-default.jpg'));
console.log('og-default.jpg written');
