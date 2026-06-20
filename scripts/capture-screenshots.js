// Capture real homepage screenshots of Ddotsmedia client sites into public/projects.
// Usage: node scripts/capture-screenshots.js
import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITES = [
  { name: "ddotsmediajobs", url: "https://ddotsmediajobs.com" },
  { name: "ddotsmediaerp", url: "https://ddotsmediaerp.com" },
  { name: "ayurconnect", url: "https://ayurconnect.com" },
  { name: "gayathi", url: "https://gayathi.ae" },
  { name: "ddotshop", url: "https://ddotshop.com" },
  { name: "milisauh", url: "https://milisauh.ae" },
];

const VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 2 };
const OUT_DIR = path.join(__dirname, "..", "public", "projects");

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const results = [];
  for (const site of SITES) {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    try {
      console.log(`→ ${site.url}`);
      await page.goto(site.url, { waitUntil: "networkidle2", timeout: 60000 });
      await new Promise((r) => setTimeout(r, 2000));
      const file = path.join(OUT_DIR, `${site.name}.png`);
      // Viewport clip (not full-page) so we capture the above-the-fold hero.
      await page.screenshot({
        path: file,
        clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
      });
      console.log(`  ✓ saved public/projects/${site.name}.png`);
      results.push({ name: site.name, ok: true });
    } catch (err) {
      console.error(`  ✗ ${site.url} failed: ${err.message}`);
      results.push({ name: site.name, ok: false, error: err.message });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  const ok = results.filter((r) => r.ok).length;
  console.log(`\nDone: ${ok}/${SITES.length} captured.`);
  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.log("Failed:", failed.map((f) => f.name).join(", "));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
