import sharp from "sharp";
const [,, file, x, y, w, h, out, scale] = process.argv;
let p = sharp(file).extract({left:+x,top:+y,width:+w,height:+h});
if (scale && +scale !== 1) { const m = await sharp(file).metadata(); p = p.resize(Math.round(+w*+scale)); }
await p.toFile(out);
const m = await sharp(file).metadata();
console.log(file, m.width+"x"+m.height);
