import { getItem, setItem, clear } from "localforage";
import axios from "axios";
import { intersection } from "lodash-es";

export const verifyJwt = async (token) => {
  const { data } = await axios({
    method: "post",
    baseURL: process.env.API_BASE_URL,
    url: "/auth/verify-jwt",
    data: { token },
  });

  const { apikey } = data;
  if (!apikey) throw new Error("Missing apikey in response");
  await setItem("apikey", apikey);
};

export const fetchUserInfos = async () => {
  const apikey = await getItem("apikey");
  if (!apikey) return null;

  const { data } = await axios({
    method: "get",
    baseURL: process.env.API_BASE_URL,
    url: "/user/infos",
    headers: { apikey },
  });

  if (!data) return null;

  const { _id, username, type, discord, google, avatar } = data;
  await setItem("id", _id.toString());
  await setItem("username", username);
  await setItem("avatar", avatar);

  const userId = type === "discord" ? discord?.id : google?.id;
  const discordRoles = type === "discord" ? discord?.roles || [] : [];
  await setItem("userId", userId);
  await setItem("discordRoles", discordRoles);

  return { id: _id, username, avatar, userId, discordRoles, type };
};

export const getApiKey = async () => {
  const userApiKey = await getItem("apikey");
  return userApiKey || process.env.API_KEY;
};

export const getUserInfos = async () => {
  const [apikey, userId, username, avatar, discordRoles] = await Promise.all([
    getItem("apikey"),
    getItem("userId"),
    getItem("username"),
    getItem("avatar"),
    getItem("discordRoles"),
  ]);

  return {
    isLogged: !!apikey,
    apikey,
    userId,
    username,
    avatar,
    discordRoles: discordRoles || [],
  };
};

export const logout = async () => {
  await clear();
};

export const canEdit = (discordRoles) => {
  if (!discordRoles?.length) return false;
  const authorizedRoles = (process.env.AUTHORIZED_SCRIBES || "").split(",");
  return intersection(authorizedRoles, discordRoles).length > 0;
};
