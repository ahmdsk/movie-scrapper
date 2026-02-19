import axios from "axios";

export const createApi = (
  baseURL: string,
  headers?: Record<string, string>,
) => {
  console.log({
    headers: {
      "accept": "application/json",
      ...headers,
    }
  });

  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "accept": "application/json",
      ...headers,
    }
  });
};