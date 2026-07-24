const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");
const DIST_DIR = path.join(__dirname, "..", "dist", "src");
const ASSET_EXTENSIONS = [".txt", ".md"];

function copyAssets(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const srcPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      copyAssets(srcPath);
      continue;
    }

    if (!ASSET_EXTENSIONS.includes(path.extname(entry.name))) {
      continue;
    }

    const relativePath = path.relative(SRC_DIR, srcPath);
    const destPath = path.join(DIST_DIR, relativePath);

    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
  }
}

copyAssets(SRC_DIR);
