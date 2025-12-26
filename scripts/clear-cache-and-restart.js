/**
 * Clear Next.js cache and restart dev server
 * This helps when ISR cached pages aren't updating
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Clearing Next.js cache...\n');

// Remove .next directory
const nextDir = path.join(__dirname, '..', '.next');
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log('✅ Removed .next directory');
} else {
  console.log('ℹ️  No .next directory found');
}

console.log('\n✨ Cache cleared!');
console.log('\n📝 Next steps:');
console.log('   1. Stop your dev server (Ctrl+C)');
console.log('   2. Run: npm run dev');
console.log('   3. Open: http://localhost:3000');
console.log('   4. Your featured project should now appear!\n');
