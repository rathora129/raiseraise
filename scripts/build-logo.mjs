// Generates the master RaiseRaise logo assets from measured geometry.
// Run: node scripts/build-logo.mjs
import fs from 'node:fs';
import path from 'node:path';
import * as fontkit from 'fontkit';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const BRAND_DIR = path.join(ROOT, 'public/images/brand');
fs.mkdirSync(BRAND_DIR, { recursive: true });

const BRAND = {
  emerald: '#278672',
  turquoise: '#4BC2AC',
  white: '#FFFFFF',
};

const W = 302;
const H = 412;
const ICON_H = 357;

const triangleLeft = 'M151 0.5 L151 297 L10 357 L0.5 357 Z';
const triangleRight = 'M151 0.5 L301.5 357 L292 357 L151 297 Z';

const capsuleOuter =
  'M123 142 H178 A43 43 0 0 1 221 185 A43 43 0 0 1 178 228 H123 A43 43 0 0 1 80 185 A43 43 0 0 1 123 142 Z';
const lobeLeft =
  'M141 160 H123 A25 25 0 0 0 98 185 A25 25 0 0 0 123 210 H141 Z';
const lobeRight =
  'M160 160 H178 A25 25 0 0 1 203 185 A25 25 0 0 1 178 210 H160 Z';

// Legs: 21px white bands from below the capsule toward the base tips.
const legLeft = 'M114.5 214 L135.3 214 L29.6 347 L8.6 347 Z';
const legRight = 'M166.7 214 L187.5 214 L293.4 347 L272.4 347 Z';

// Needle: the centre bar tapers to the base notch with a hairline split.
const needleLeft = 'M141.5 226 L151 226 L150.2 296.5 Z';
const needleRight = 'M151 226 L160.5 226 L151.8 296.5 Z';

// ---- Wordmark (outlined Manrope ExtraBold) ----
const font = fontkit.openSync(path.join(ROOT, 'assets/fonts/Manrope.ttf'));
const weight = font.getVariation({ wght: 700 });
const text = 'RaiseRaise';
const run = weight.layout(text);
const targetWidth = 302;
const scale = targetWidth / run.advanceWidth;
const fontSize = scale * weight.unitsPerEm;
const baseline = 403;

let wordPaths = '';
let x = 0;
run.glyphs.forEach((glyph, i) => {
  const p = glyph.path.scale(scale, -scale).translate(x, baseline);
  const fill = i < 5 ? BRAND.emerald : BRAND.turquoise;
  wordPaths += `  <path d="${p.toSVG()}" fill="${fill}"/>\n`;
  x += (run.positions[i]?.xAdvance ?? glyph.advanceWidth) * scale;
});

function icon({ fillGlyph = BRAND.white } = {}) {
  return `  <path d="${triangleLeft}" fill="${BRAND.emerald}"/>
  <path d="${triangleRight}" fill="${BRAND.turquoise}"/>
  <g fill="${fillGlyph}">
    <path d="${legLeft}"/>
    <path d="${legRight}"/>
    <path fill-rule="evenodd" d="${capsuleOuter} ${lobeLeft} ${lobeRight}"/>
    <path d="${needleLeft}"/>
    <path d="${needleRight}"/>
  </g>`;
}

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${ICON_H}" role="img" aria-label="RaiseRaise Elevators symbol">
${icon()}
</svg>
`;

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="RaiseRaise Elevators">
${icon()}
  <g aria-hidden="true">
${wordPaths}  </g>
</svg>
`;

const logoSvgDark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="RaiseRaise Elevators">
${icon()}
  <g aria-hidden="true">
${wordPaths.replaceAll(BRAND.emerald, BRAND.white).replaceAll(BRAND.turquoise, '#A9E8DA')}  </g>
</svg>
`;

fs.writeFileSync(path.join(BRAND_DIR, 'raiseraise-icon.svg'), iconSvg);
fs.writeFileSync(path.join(BRAND_DIR, 'raiseraise-logo.svg'), logoSvg);
fs.writeFileSync(path.join(BRAND_DIR, 'raiseraise-logo-dark.svg'), logoSvgDark);
fs.writeFileSync(path.join(ROOT, 'public/favicon.svg'), iconSvg.replace(`viewBox="0 0 ${W} ${ICON_H}"`, 'viewBox="0 0 302 357"'));
fs.mkdirSync(path.join(ROOT, 'app'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'app/icon.svg'), iconSvg);

await sharp(Buffer.from(logoSvg)).resize({ width: 3000 }).png({ compressionLevel: 9 }).toFile(path.join(BRAND_DIR, 'raiseraise-logo.png'));
await sharp(Buffer.from(iconSvg)).resize({ width: 1200 }).png({ compressionLevel: 9 }).toFile(path.join(BRAND_DIR, 'raiseraise-icon.png'));
await sharp(Buffer.from(logoSvg)).resize({ width: 600 }).png().toFile(path.join(ROOT, 'public/images/brand/raiseraise-logo-600.png'));

console.log('fontSize', fontSize.toFixed(2), 'advance', run.advanceWidth);
console.log('wrote brand assets to', BRAND_DIR);
