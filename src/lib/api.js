import axios from "axios";
import { getItem, setItem } from "localforage";
import { deburr } from "lodash";
import { getUserId } from "./user";

export const getApiKey = async () => {
  try {
    const userApiKey = await getItem("apikey");
    if (!userApiKey) {
      return process.env.API_KEY;
    }
    return userApiKey;
  } catch (error) {
    return process.env.API_KEY;
  }
};

export const fetchUserInfos = async () => {
  try {
    const apikey = await getItem("apikey");

    const user = await axios({
      method: "get",
      baseURL: process.env.API_BASE_URL,
      url: "/user/infos",
      headers: { apikey },
    });
    if (user?.data) {
      const { _id, username, type, discord, google } = user.data;
      await setItem("id", _id.toString());
      switch (type) {
        case "discord":
          await setItem("username", username);
          await setItem("discordRoles", discord.roles);
          await setItem("userId", discord.id);
          return;
        case "google":
          await setItem("username", username);
          await setItem("discordRoles", []);
          await setItem("userId", google.id);
          return;
        default:
          return;
      }
    }
  } catch (error) {
    console.log("[fetchUserInfos] error ", error);
  }
};

export const searchOrop = async (query) => {
  try {
    const value = await query.queryKey[1];
    const apikey = await getApiKey();

    const { data } = await axios({
      headers: { apikey },
      method: "get",
      baseURL: process.env.API_BASE_URL,
      url: "/orop/search",
      params: { title: deburr(value) },
    });
    return data;
  } catch (error) {
    return error.message;
  }
};

export const userRatings = async (query) => {
  const apikey = await getApiKey();

  const { data } = await axios({
    headers: { apikey },
    method: "get",
    baseURL: process.env.API_BASE_URL,
    url: "/discordorop/ratings",
    params: { noLimit: true },
  });
  return data;
};

export const postUserRating = async (title, rating) => {
  const apikey = await getApiKey();
  const body = { title, rating };

  const { data } = await axios({
    headers: { apikey },
    method: "post",
    baseURL: process.env.API_BASE_URL,
    url:
      apikey === process.env.YOEL_API_KEY ? "/fporop/rating" : "/discordorop",
    data: body,
  });
  return data;
};

export const removeUserRating = async (title) => {
  const apikey = await getApiKey();
  const params = { title };

  const { data } = await axios({
    headers: { apikey },
    method: "put",
    baseURL: process.env.API_BASE_URL,
    url: "/discordorop/ratings/remove",
    params,
  });
  return data;
};

export const postAskForOrop = async (title) => {
  const apikey = await getApiKey();
  const params = { title };

  const { data } = await axios({
    headers: { apikey },
    method: "post",
    baseURL: process.env.API_BASE_URL,
    url: "/orop/ask",
    params,
  });
  return data;
};

export const getTopAskedOrop = async () => {
  const apikey = await getApiKey();
  const { data } = await axios({
    headers: { apikey },
    method: "get",
    baseURL: process.env.API_BASE_URL,
    url: "/orop/top/asked",
  });
  return data;
};

export const updateBoardgame = async (id, payload) => {
  try {
    const apikey = await getApiKey();
    const { data } = await axios({
      headers: { apikey },
      method: "put",
      baseURL: process.env.API_BASE_URL,
      url: `/boardgame/${id}`,
      data: payload,
    });

    return data;
  } catch (error) {
    return error.message;
  }
};

export const deleteBoardgame = async (id) => {
  try {
    const apikey = await getApiKey();
    console.log("api key", apikey);
    const { data } = await axios({
      headers: { apikey },
      method: "delete",
      baseURL: process.env.API_BASE_URL,
      url: `/boardgame/${id}`,
    });

    return data;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

export const getAllOrop = async ({ page }) => {
  try {
    const apikey = await getApiKey();
    const {
      data: { data: boardgames, currentPage, totalPages, totalDocuments },
    } = await axios({
      headers: { apikey },
      method: "get",
      baseURL: process.env.API_BASE_URL,
      url: `/orop/all?page=${page || 1}`,
    });

    return { boardgames, currentPage, totalPages, totalDocuments };
  } catch (error) {
    return error.message;
  }
};

export const getYoutubeOrop = async (id) => {
  try {
    const apikey = await getApiKey();
    const { data } = await axios({
      headers: { apikey },
      method: "get",
      baseURL: process.env.API_BASE_URL,
      url: `/boardgame/${id}/youtube`,
    });

    return data;
  } catch (error) {
    return error.message;
  }
};
