import sharp from "sharp";

const file = "public/logo.avif";
const { data, info } = await sharp(file)
  .resize(160, 160, { fit: "inside" })
  .raw()
  .toBuffer({ resolveWithObject: true });

const channels = info.channels;
const counts = new Map();
for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = channels === 4 ? data[i + 3] : 255;
  if (a < 128) continue;
  const qr = r >> 4 << 4;
  const qg = g >> 4 << 4;
  const qb = b >> 4 << 4;
  const key = (qr << 16) | (qg << 8) | qb;
  counts.set(key, (counts.get(key) || 0) + 1);
}

const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
const toHex = (n) => "#" + n.toString(16).padStart(6, "0").toUpperCase();
const luminance = (rgb) => {
  const r = (rgb >> 16) & 0xff, g = (rgb >> 8) & 0xff, b = rgb & 0xff;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const sat = (rgb) => {
  const r = (rgb >> 16) & 0xff, g = (rgb >> 8) & 0xff, b = rgb & 0xff;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
};

console.log("Top 10 colors by frequency:");
for (const [rgb, count] of sorted.slice(0, 10)) {
  console.log(`  ${toHex(rgb)}  count=${count}  lum=${luminance(rgb).toFixed(0)}  sat=${sat(rgb).toFixed(2)}`);
}

const mids = sorted.filter(([rgb]) => {
  const l = luminance(rgb);
  return l > 30 && l < 230;
});
const saturated = sorted.filter(([rgb]) => sat(rgb) > 0.35);

console.log("\nMost saturated colors (likely brand accents):");
for (const [rgb, count] of saturated.slice(0, 5)) {
  console.log(`  ${toHex(rgb)}  count=${count}`);
}
console.log("\nMid-luminance colors (likely brand neutrals):");
for (const [rgb, count] of mids.slice(0, 5)) {
  console.log(`  ${toHex(rgb)}  count=${count}`);
}
