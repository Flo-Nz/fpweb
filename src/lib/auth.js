import localforage from "localforage";
import axios from "axios";
import { intersection } from "lodash-es";

const storage = localforage.createInstance({ name: "fp" });

const safeGet = async (key) => {
  try {
    await storage.ready();
    return await storage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = async (key, value) => {
  try {
    await storage.ready();
    await storage.setItem(key, value);
  } catch {
    // Silent fail — storage unavailable
  }
};

export const verifyJwt = async (token) => {
  const { data } = await axios({
    method: "post",
    baseURL: process.env.API_BASE_URL,
    url: "/auth/verify-jwt",
    data: { token },
  });

  const { apikey } = data;
  if (!apikey) throw new Error("Missing apikey in response");
  await safeSet("apikey", apikey);
};

export const fetchUserInfos = async () => {
  const apikey = await safeGet("apikey");
  if (!apikey) return null;

  const { data } = await axios({
    method: "get",
    baseURL: process.env.API_BASE_URL,
    url: "/user/infos",
    headers: { apikey },
  });

  if (!data) return null;

  const { _id, username, type, discord, google, avatar } = data;
  await safeSet("id", _id.toString());
  await safeSet("username", username);
  await safeSet("avatar", avatar);

  const userId = type === "discord" ? discord?.id : google?.id;
  const discordRoles = type === "discord" ? discord?.roles || [] : [];
  await safeSet("userId", userId);
  await safeSet("discordRoles", discordRoles);

  return { id: _id, username, avatar, userId, discordRoles, type };
};

export const getApiKey = async () => {
  const userApiKey = await safeGet("apikey");
  return userApiKey || process.env.API_KEY;
};

export const getUserInfos = async () => {
  const [apikey, userId, username, avatar, discordRoles] = await Promise.all([
    safeGet("apikey"),
    safeGet("userId"),
    safeGet("username"),
    safeGet("avatar"),
    safeGet("discordRoles"),
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
  try {
    await storage.ready();
    await storage.clear();
  } catch {
    // Silent fail
  }
};

export const canEdit = (discordRoles) => {
  if (!discordRoles?.length) return false;
  const authorizedRoles = (process.env.AUTHORIZED_SCRIBES || "").split(",");
  return intersection(authorizedRoles, discordRoles).length > 0;
};
