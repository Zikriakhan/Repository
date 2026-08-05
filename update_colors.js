const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // 1. Vibrant Pinks / Magenta / Crimson / Reds -> Racing Red (#92141f) & Dark Racing Red (#b30c15)
  [/92141f/gi, '92141f'],
  [/92141f/gi, 'b30c15'],
  [/e11e5c/gi, '92141f'],
  [/ce1650/gi, 'c70e18'],
  [/c21153/gi, 'b30c15'],
  [/a00d43/gi, '8a080f'],
  [/8b0a3c/gi, '8a080f'],
  [/9e2a4b/gi, '92141f'],
  [/800020/gi, 'b30c15'],
  [/6d1f3b/gi, 'b30c15'],
  [/86284a/gi, '92141f'],
  [/73223f/gi, 'b30c15'],
  [/5a1930/gi, '8a080f'],
  [/from-pink-400/gi, 'from-[#92141f]'],
  [/to-pink-500/gi, 'to-[#b30c15]'],
  [/pink-400/gi, 'red-500'],
  [/pink-500/gi, 'red-700'],

  // 2. Dark Burgundy / Chocolate / Deep Brown -> British Racing Green Dark (#044d1d) & Deep Forest (#033815)
  [/3a1e26/gi, '044d1d'],
  [/2a151b/gi, '033815'],
  [/522a36/gi, '065f24'],
  [/5a2e38/gi, '065f24'],
  [/4a252f/gi, '044d1d'],
  [/8b1b36/gi, '044d1d'],
  [/991b36/gi, '044d1d'],
  [/7a172b/gi, '033815'],
  [/631323/gi, '033815'],
  [/3d1a29/gi, '033815'],

  // 3. Gold / Yellow / Amber Accents -> British Racing Green Light (#d0dbd4) & Sleek Highlights
  [/ffd700/gi, 'd0dbd4'],
  [/fbbf24/gi, 'd0dbd4'],
  [/f59e0b/gi, 'd0dbd4'],
  [/d97706/gi, 'd0dbd4'],
  [/eab308/gi, 'd0dbd4'],
  [/f57c00/gi, 'd0dbd4'],
  [/c69214/gi, '044d1d'],
  [/b8860b/gi, '044d1d'],
  [/b45309/gi, '044d1d'],

  // 4. Warm Cream / Off-White Light Backgrounds -> Theme Light (#F2F2F2) & Pure White (#FFFFFF)
  [/fdfaf5/gi, 'F2F2F2'],
  [/FAF5E8/gi, 'F2F2F2'],
  [/fef9f3/gi, 'F2F2F2'],
  [/fdfaf6/gi, 'F2F2F2'],
  [/fff8ed/gi, 'F2F2F2'],
  [/fcf9f2/gi, 'F2F2F2'],
  [/F3F4F6/gi, 'F2F2F2'],
  [/F5F5F5/gi, 'F2F2F2'],
  [/F9FAFB/gi, 'F2F2F2']
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = content;
      for (const [regex, replacement] of replacements) {
        modified = modified.replace(regex, replacement);
      }
      if (content !== modified) {
        fs.writeFileSync(fullPath, modified, 'utf8');
        console.log(`Updated colors in: ${path.relative(__dirname, fullPath)}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Color update complete!');
