// 生成职业图标雪碧图：src/assets/jobs/{base,filled}/*.png -> public/jobs-sprite.png
// 用法：pnpm sprite
// 输出：560x504，10 列 9 行，单元格 56px；索引 0-42 为 base，43-85 为 filled
// 注意：索引顺序即文件名排序，constants.js 的 JOB_NAMES 必须与产物保持一致；
// 产物在 public/ 下文件名固定，更新后需让客户端缓存失效（如加版本查询串）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const JOBS_DIR = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../src/assets/jobs',
);
const OUT = path.resolve(JOBS_DIR, '../../public/jobs-sprite.png');
const CELL = 56;
const COLS = 10;

const names = fs
    .readdirSync(path.join(JOBS_DIR, 'base'))
    .filter((f) => f.endsWith('.png'))
    .map((f) => f.replace('.png', ''))
    .sort();
console.log('icons:', names.length, names.join(' '));

const composites = [];
for (let i = 0; i < names.length * 2; i++) {
    const style = i < names.length ? 'base' : 'filled';
    const name = names[i % names.length];
    const img = sharp(path.join(JOBS_DIR, style, name + '.png'));
    // base 原生 56px 不重采样；filled 64px 缩到 56
    if (style === 'filled') img.resize(CELL, CELL);
    composites.push({
        input: await img.toBuffer(),
        left: (i % COLS) * CELL,
        top: Math.floor(i / COLS) * CELL,
    });
}

const rows = Math.ceil((names.length * 2) / COLS);
await sharp({
    create: {
        width: COLS * CELL,
        height: rows * CELL,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
})
    .composite(composites)
    // 调色板 PNG 比 32 位真彩小约 75%，图标为扁平图形无画质损失
    .png({ palette: true, colours: 256, quality: 100, dither: 0 })
    .toFile(OUT);

console.log('sprite:', OUT, fs.statSync(OUT).size, 'bytes', `(grid ${COLS}x${rows}, cell ${CELL})`);
