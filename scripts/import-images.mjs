import sharp from 'sharp';
import fs from 'node:fs';
const SRC='/Users/rathora129gmail.com/Documents/Qoder/2026-11-14/1ac83e09/vibe_images';
const OUT='public/images';
const map = {
  'hero-elevator-lobby_1794595669260_0d0e8f9b.png': 'spaces/lobby-hero.jpg',
  'cabin-passenger-luxury_1794595694495_d6fd0514.png': 'cabins/passenger-cabin.jpg',
  'panoramic-glass-lift_1794595713223_b0b0557f.png': 'cabins/panoramic-glass.jpg',
  'control-panel-detail_1794595733843_a61ffee6.png': 'details/control-panel.jpg',
  'hospital-elevator-cabin_1794595767847_38421b32.png': 'cabins/hospital-cabin.jpg',
  'freight-goods-elevator_1794595787282_6188d30b.png': 'cabins/goods-cabin.jpg',
  'home-lift-villa_1794595807766_3d2a1c6a.png': 'cabins/home-lift.jpg',
  'cabin-ceiling-light_1794595825913_1704c233.png': 'details/ceiling-light.jpg',
  'elevator-shaft-engineering_1794595865676_e1687ebe.png': 'engineering/shaft.jpg',
  'elevator-machine-room_1794595884903_4b173022.png': 'engineering/machine-room.jpg',
  'elevator-doors-opening_1794595902637_8a1a6349.png': 'spaces/doors-opening.jpg',
};
for (const [src, dest] of Object.entries(map)) {
  const out = `${OUT}/${dest}`;
  fs.mkdirSync(out.substring(0, out.lastIndexOf('/')), { recursive: true });
  await sharp(`${SRC}/${src}`).resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(out);
  const m = await sharp(out).metadata();
  console.log(dest, m.width+'x'+m.height, (fs.statSync(out).size/1024|0)+'KB');
}
