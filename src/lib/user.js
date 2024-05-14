import { clear, getItem } from "localforage";

export const isUserLogged = async () => {
  const id = await getItem("id");
  if (id) {
    return true;
  }
  return false;
};

export const getUserId = async () => getItem("id");

export const getUserDiscordRoles = async () => getItem("discordRoles");

export const getUserDiscordId = async () => getItem("discordId");

export const getUserApiKey = async () => getItem("apikey");

export const getUsername = async () => getItem("username");

export const logoutUser = async () =>
  clear()
    .then(console.log("Localforage is now empty"))
    .catch((err) => console.log("Localforage error", err));

export const getUserInfos = async () => {
  const isLogged = await isUserLogged();
  const discordId = await getUserDiscordId();
  const discordRoles = await getUserDiscordRoles();
  const apikey = await getUserApiKey();
  const userId = await getUserId();
  const username = await getUsername();
  return { isLogged, discordId, discordRoles, apikey, userId, username };
};
