import { TMDBMovieResponse, TMDBResponse, TMDBTVShowResponse } from "../types/tmdb";
import { createApi } from "./axios";

const api = createApi(
  process.env.TMDB_API_URL || "https://api.themoviedb.org/3",
  {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
);

export const searchMovieDetailsByName = async (name: string) => {
  try {
    const response = await api.get<TMDBResponse<TMDBMovieResponse>>(
      "/search/movie?include_adult=false&language=id-ID&page=1",
      {
        params: {
          query: name,
        },
      },
    );

    console.log("TMDB API Response:", response.data);

    return response.data.results[0]; // Return the first result
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const searchTVShowDetailsByName = async (name: string) => {
  try {
    const response = await api.get<TMDBResponse<TMDBTVShowResponse>>(
      "/search/tv?include_adult=false&language=id-ID&page=1",
      {
        params: {
          query: name,
        },
      },
    );

    console.log("TMDB API Response:", response.data);

    return response.data.results[0]; // Return the first result
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    throw error;
  }
};

// searchMovieDetailsByName("predator badlands").then((details) => {
//   console.log("Movie Details:", details);
// });
