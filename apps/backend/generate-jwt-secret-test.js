const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Paths
const envPath = path.join(__dirname, '.env.test');

// Generate 32-byte random secret
const secret = crypto.randomBytes(32).toString('hex');

console.log(`Generated JWT_SECRET: ${secret}`);

// Determine target file
let targetPath = envPath;
let envContent = '';

if (fs.existsSync(envPath)) {
  // .env.test exists → read it
  envContent = fs.readFileSync(envPath, 'utf-8');
} else {
  console.error('No .env.test found');
  process.exit(1);
}

// Replace existing JWT_SECRET or add it if missing
if (envContent.match(/^JWT_SECRET=.*/m)) {
  envContent = envContent.replace(/^JWT_SECRET=.*/m, `JWT_SECRET=${secret}`);
} else {
  envContent += `\nJWT_SECRET=${secret}\n`;
}

// Write back to target file
fs.writeFileSync(targetPath, envContent);

console.log(`JWT_SECRET has been written to ${targetPath}`);
