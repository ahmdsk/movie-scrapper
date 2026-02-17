import { Page } from "playwright";

// Index Page
export const scrapeNgefilmIndex = async (page: Page) => {
  await page.goto("https://new31.ngefilm.site/", {
    waitUntil: "domcontentloaded",
  });

  const data = await page.evaluate(() => {
    const gridItems = document.getElementById("gmr-main-load");
    if (!gridItems) return [];

    const cardItems = gridItems.querySelectorAll(
      ".item-infinite .gmr-box-content",
    );

    const data = Array.from(cardItems).map((card) => {
      const headerCard = card.querySelector(".content-thumbnail");
      const bodyCard = card.querySelector(".item-article");

      // Header Section
      const posterImage =
        headerCard?.querySelector("a img.wp-post-image")?.getAttribute("src") ||
        "";
      const url = headerCard?.querySelector("a")?.getAttribute("href") || "";
      const rating =
        headerCard?.querySelector(".gmr-rating-item")?.textContent?.trim() ||
        "";
      const duration =
        headerCard?.querySelector(".gmr-duration-item")?.textContent?.trim() ||
        "";
      const quality =
        headerCard?.querySelector(".gmr-quality-item")?.textContent?.trim() ||
        "";

      //    If Have eps
      const eps =
        headerCard?.querySelector(".gmr-numbeps span")?.textContent?.trim() ||
        "";
      const postType =
        headerCard?.querySelector(".gmr-posttype-item")?.textContent?.trim() ||
        "";

      // Body Section
      const title =
        bodyCard?.querySelector(".entry-title")?.textContent?.trim() || "";
      const genre = Array.from(
        bodyCard?.querySelectorAll(".gmr-movie-on a") || [],
      ).map((el) => el.textContent?.trim() || "");

      //   Trailer
      const trailerUrl =
        bodyCard?.querySelector(".gmr-popup-button a")?.getAttribute("href") ||
        "";

      return {
        image: posterImage,
        url,
        rating,
        duration,
        quality,
        title,
        genre,
        eps,
        postType,
        trailerUrl,
      };
    });

    return data;
  });

  console.log("Card Data: ", data);

  return data;
};

// Detail Page (Video URL)
export const scrapeNgefilmVideoUrl = async (page: Page, url: string) => {
  // Kill popup BEFORE page load
  await page.addInitScript(() => {
    const killPopups = () => {
      document
        .querySelectorAll(
          "#idmuvi-popup, .gmr-bannerpopup, .gmr-bannerpopup-inner",
        )
        .forEach((el) => {
          (el as HTMLElement).style.pointerEvents = "none";
          el.remove();
        });
    };

    killPopups();
    setInterval(killPopups, 300);
  });

  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.waitForSelector(".gmr-embed-responsive iframe");

  await page.click(".gmr-embed-responsive", {
    delay: 120,
  });

  await page.waitForFunction(() => {
    const iframe = document.querySelector(
      ".gmr-embed-responsive iframe",
    ) as HTMLIFrameElement | null;

    const src =
      iframe?.getAttribute("src") || iframe?.getAttribute("data-litespeed-src");

    return !!src && src !== "about:blank";
  });

  const data = await page.evaluate(async () => {
    const iframe = document.querySelector(
      ".gmr-embed-responsive iframe",
    ) as HTMLIFrameElement | null;

    console.log("Found iframe: ", iframe?.getAttribute("src"));

    return {
      urlVideo:
        iframe?.getAttribute("src") ||
        iframe?.getAttribute("data-litespeed-src") ||
        null,
    };
  });

  return data;
};

export const scrapeServerNgefilmVideoUrl = async (page: Page, url: string) => {
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const data = await page.evaluate(() => {
    const serverDiv = document.querySelector("ul.muvipro-player-tabs");
    if (!serverDiv) return {};

    const serverItems = serverDiv.querySelectorAll("li a");

    const servers = Array.from(serverItems).map((item) => {
      const serverName = item.textContent?.trim() || "";
      const serverUrl = item.getAttribute("href") || "";

      return {
        serverName,
        serverUrl,
      };
    });

    return {
      servers,
    };
  })

  return data;
}