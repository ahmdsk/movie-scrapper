import { chromium } from "playwright";
import { scrapeNgefilmIndex } from "./scrapers/ngefilm";

const browser = await chromium.launch({
    headless: true,
})

const page = await browser.newPage();
page.on("console", (msg) => {
    console.log("[BROWSER]", msg.text());
});

const result = await scrapeNgefilmIndex(page);
console.log("Scrape Result: ", result);

await browser.close();