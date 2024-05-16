import axios from "axios";
import { getItem, setItem } from "localforage";
import { deburr } from "lodash";

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
    console.log("valueeeeeee", value);
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
