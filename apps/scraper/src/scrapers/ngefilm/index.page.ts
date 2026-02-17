export const parseIndexPageNgefilm = () => {
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
      headerCard?.querySelector(".gmr-rating-item")?.textContent?.trim() || "";
    const duration =
      headerCard?.querySelector(".gmr-duration-item")?.textContent?.trim() ||
      "";
    const quality =
      headerCard?.querySelector(".gmr-quality-item")?.textContent?.trim() || "";

    //    If Have eps
    const eps =
      headerCard?.querySelector(".gmr-numbeps span")?.textContent?.trim() || "";
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
}
