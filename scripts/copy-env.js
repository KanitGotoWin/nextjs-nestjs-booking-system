const fs = require("fs");
const path = require("path");

const [packageName] = process.argv.slice(2); // e.g. 'backend' or 'web'
if (!packageName) {
  console.error("Usage: node copy-env.js <packageName>");
  process.exit(1);
}

const packageDir = path.join(__dirname, "..", "apps", packageName);
const examplePath = path.join(packageDir, ".env.example");
const envPath = path.join(packageDir, ".env");

if (!fs.existsSync(examplePath)) {
  console.error(`No .env.example found in ${packageDir}`);
  process.exit(1);
}

fs.copyFileSync(examplePath, envPath);
console.log(`✅ .env created for ${packageName}`);
