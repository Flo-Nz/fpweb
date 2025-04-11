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
      const { _id, username, type, discord, google, avatar } = user.data;
      await setItem("id", _id.toString());
      await setItem("username", username);
      await setItem("avatar", avatar);
      switch (type) {
        case "discord":
          await setItem("discordRoles", discord.roles);
          await setItem("userId", discord.id);
          return;
        case "google":
          await setItem("discordRoles", []);
          await setItem("userId", google.id);
          return;
        default:
          return;
      }
    }
  } catch (error) {
    throw error;
  }
};

export const searchOrop = async (query) => {
  try {
    const apikey = await getApiKey();
    const value = await query.queryKey[1];
    const oropOnly = await query.queryKey[2];

    const { data } = await axios({
      headers: { apikey },
      method: "get",
      baseURL: process.env.API_BASE_URL,
      url: "/orop/search",
      params: { title: deburr(value), oropOnly: oropOnly ? "true" : "false" },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const userRatings = async (query) => {
  try {
    const apikey = await getApiKey();

    const { data } = await axios({
      headers: { apikey },
      method: "get",
      baseURL: process.env.API_BASE_URL,
      url: "/discordorop/ratings",
      params: { noLimit: true },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const postUserRating = async (title, rating, comment) => {
  try {
    const apikey = await getApiKey();
    const body = { title, rating, comment };

    const { data } = await axios({
      headers: { apikey },
      method: "post",
      baseURL: process.env.API_BASE_URL,
      url:
        apikey === process.env.YOEL_API_KEY ? "/fporop/rating" : "/discordorop",
      data: body,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const removeUserRating = async ({ title, rating, comment }) => {
  try {
    const apikey = await getApiKey();
    const params = { title, rating, comment };

    const { data } = await axios({
      headers: { apikey },
      method: "put",
      baseURL: process.env.API_BASE_URL,
      url: "/discordorop/ratings/remove",
      params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const postAskForOrop = async (title) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

export const getTopAskedOrop = async () => {
  try {
    const apikey = await getApiKey();
    const { data } = await axios({
      headers: { apikey },
      method: "get",
      baseURL: process.env.API_BASE_URL,
      url: "/orop/top/asked",
    });
    return data;
  } catch (error) {
    throw error;
  }
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
    throw error;
  }
};

export const deleteBoardgame = async (id) => {
  try {
    const apikey = await getApiKey();
    const { data } = await axios({
      headers: { apikey },
      method: "delete",
      baseURL: process.env.API_BASE_URL,
      url: `/boardgame/${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const addBoardgame = async (payload) => {
  try {
    const apikey = await getApiKey();
    const { data } = await axios({
      headers: { apikey },
      method: "post",
      baseURL: process.env.API_BASE_URL,
      url: `/boardgame`,
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllOrop = async ({ page = 1, oropOnly }) => {
  try {
    const apikey = await getApiKey();
    const {
      data: { data: boardgames, currentPage, totalPages, totalDocuments },
    } = await axios({
      headers: { apikey },
      method: "get",
      baseURL: process.env.API_BASE_URL,
      url: `/orop/all?`,
      params: {
        page,
        oropOnly: oropOnly ? "true" : "false",
      },
    });

    return { boardgames, currentPage, totalPages, totalDocuments };
  } catch (error) {
    throw error;
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
    throw error;
  }
};

export const getPendingBoardgames = async () => {
  try {
    const apikey = await getApiKey();
    const { data } = await axios({
      headers: { apikey },
      method: "get",
      baseURL: process.env.API_BASE_URL,
      url: `/boardgame/pending`,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const validateBoardgame = async (id) => {
  try {
    const apikey = await getApiKey();
    const { data } = await axios({
      headers: { apikey },
      method: "get",
      baseURL: process.env.API_BASE_URL,
      url: `/boardgame/${id}/validate`,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
