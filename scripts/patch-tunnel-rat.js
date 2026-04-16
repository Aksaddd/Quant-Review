const fs = require('fs');
const path = require('path');

// Patch tunnel-rat to use useEffect instead of useLayoutEffect
// This fixes the "Maximum update depth exceeded" infinite loop
// caused by synchronous Zustand state updates during React's commit phase

const filePath = path.join(__dirname, '..', 'node_modules', 'tunnel-rat', 'dist', 'index.js');

if (!fs.existsSync(filePath)) {
  console.log('tunnel-rat not found, skipping patch');
  process.exit(0);
}

let content = fs.readFileSync(filePath, 'utf8');

if (content.includes('PATCHED')) {
  console.log('tunnel-rat already patched');
  process.exit(0);
}

// Replace the useIsomorphicLayoutEffect with plain useEffect
content = content.replace(
  /const useIsomorphicLayoutEffect = typeof window.*?React\.useEffect;/s,
  '/* PATCHED */ const useIsomorphicLayoutEffect = React.useEffect;'
);

fs.writeFileSync(filePath, content);
console.log('tunnel-rat patched successfully');
