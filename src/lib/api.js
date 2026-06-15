import axios from "axios";
import { deburr } from "lodash-es";
import { getApiKey } from "./auth";

const api = async (options) => {
  const apikey = await getApiKey();
  return axios({
    baseURL: process.env.API_BASE_URL,
    headers: { apikey },
    ...options,
  });
};

// Search
export const searchOrop = async (title, oropOnly = false) => {
  const { data } = await api({
    method: "get",
    url: "/orop/search",
    params: { title: deburr(title), oropOnly: oropOnly ? "true" : "false" },
  });
  return data;
};

// Single boardgame
export const getBoardgame = async (id, options = {}) => {
  const params = new URLSearchParams(options).toString();
  const url = params ? `/boardgame/${id}?${params}` : `/boardgame/${id}`;
  const { data } = await api({ method: "get", url });
  return data;
};

// List all with pagination
export const getAllOrop = async ({ page = 1, oropOnly = false, limit = 24, fpRating, discordRating }) => {
  const params = { page, oropOnly: oropOnly ? "true" : "false", limit };
  if (fpRating) params.fpRating = fpRating;
  if (discordRating) params.discordRating = discordRating;

  const { data } = await api({
    method: "get",
    url: "/orop/all",
    params,
  });
  return data;
};

// Rating (unified endpoint)
export const postRating = async (title, rating, review) => {
  const body = { title, rating };
  if (review) body.review = review;
  const { data } = await api({
    method: "post",
    url: "/rating",
    data: body,
  });
  return data;
};

// User ratings (paginated)
export const getUserRatings = async ({ skip = 0, limit = 12 } = {}) => {
  const { data } = await api({
    method: "get",
    url: "/discordorop/ratings",
    params: { skip, limit },
  });
  return data;
};

// Remove user rating
export const removeUserRating = async (title) => {
  const { data } = await api({
    method: "put",
    url: "/discordorop/ratings/remove",
    params: { title, rating: "true" },
  });
  return data;
};

// Update boardgame (scribe only)
export const updateBoardgame = async (id, payload) => {
  const { data } = await api({
    method: "put",
    url: `/boardgame/${id}`,
    data: payload,
  });
  return data;
};

// Pending boardgames (scribe only)
export const getPendingBoardgames = async () => {
  const { data } = await api({
    method: "get",
    url: "/boardgame/pending",
  });
  return data;
};

// Validate a boardgame (scribe only)
export const validateBoardgame = async (id) => {
  const { data } = await api({
    method: "get",
    url: `/boardgame/${id}/validate`,
  });
  return data;
};

// Delete a boardgame (scribe only)
export const deleteBoardgame = async (id) => {
  const { data } = await api({
    method: "delete",
    url: `/boardgame/${id}`,
  });
  return data;
};

// Top asked
export const getTopAsked = async () => {
  const { data } = await api({ method: "get", url: "/orop/top/asked" });
  return data;
};

// BGG Cover
export const fetchBggCover = async (id) => {
  const { data } = await api({
    method: "get",
    url: `/boardgame/${id}/cover`,
  });
  return data;
};

// Add a new boardgame
export const addBoardgame = async (title) => {
  const { data } = await api({
    method: "post",
    url: "/boardgame",
    data: { title: [title.toLowerCase()] },
  });
  return data;
};

// Latest reviews
export const getLatestReviews = async () => {
  const { data } = await api({
    method: "get",
    url: "/orop/reviews/latest",
    params: { limit: 6 },
  });
  return data;
};
