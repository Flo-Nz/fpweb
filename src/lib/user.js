import { clear, getItem } from "localforage";
import { includes, intersection } from "lodash";

export const isUserLogged = async () => {
  const id = await getItem("id");
  if (id) {
    return true;
  }
  return false;
};

export const getId = async () => getItem("id");

export const getUserDiscordRoles = async () => getItem("discordRoles");

export const getUserId = async () => getItem("userId");

export const getUserApiKey = async () => getItem("apikey");

export const getUsername = async () => getItem("username");

export const getAvatar = async () => getItem("avatar");

export const logoutUser = async () =>
  clear()
    .then(console.log("Localforage is now empty"))
    .catch((err) => console.log("Localforage error", err));

export const getUserInfos = async () => {
  const isLogged = await isUserLogged();
  const userId = await getUserId();
  const discordRoles = await getUserDiscordRoles();
  const apikey = await getUserApiKey();
  const id = await getId();
  const username = await getUsername();
  const avatar = await getAvatar();
  return { isLogged, userId, discordRoles, apikey, id, username, avatar };
};

export const userCanEdit = (discordRoles) => {
  const authorizedEditionRoles = process.env.AUTHORIZED_SCRIBES.split(",");
  const commonRoles = intersection(authorizedEditionRoles, discordRoles);
  if (commonRoles?.length > 0) {
    return true;
  }
  return false;
};
