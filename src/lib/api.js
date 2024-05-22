import axios from "axios";
import { getItem, setItem } from "localforage";
import { deburr } from "lodash";
import { getUserDiscordId, getUserId } from "./user";

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
      const { _id, username, discord } = user.data;
      await setItem("id", _id.toString());
      await setItem("username", username);
      await setItem("discordRoles", discord.roles);
      await setItem("discordId", discord.id);
    }
    return;
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
