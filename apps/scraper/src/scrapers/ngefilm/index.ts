import { chromium, Page } from "playwright";
import { parseIndexPageNgefilm } from "./index.page";

export const scrapeNgefilmIndex = async (page: Page) => {
  await page.goto("https://new31.ngefilm.site/", {
    waitUntil: "networkidle",
  });

  const data = await page.evaluate(parseIndexPageNgefilm);

  console.log("Card Data: ", data);

  return data;
};
