import { chromium } from "playwright";
import { scrapeNgefilmIndex, scrapeNgefilmVideoUrl, scrapeServerNgefilmVideoUrl } from "./scrapers/ngefilm";

const browser = await chromium.launch({
  headless: true,
});
const context = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  viewport: { width: 1280, height: 800 },
});

const page = await context.newPage();

page.on("console", (msg) => {
  console.log("[BROWSER]", msg.text());
});

const result = await scrapeNgefilmVideoUrl(
  page,
  "https://new31.ngefilm.site/predator-badlands-2025/?player=4",
);
// const result = await scrapeNgefilmIndex(page);

// const result = await scrapeServerNgefilmVideoUrl(
//   page,
//   "https://new31.ngefilm.site/predator-badlands-2025",
// );

console.log("Scrape Result: ", result);

await browser.close();