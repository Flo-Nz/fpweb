import axios from "axios";
import { clear, getItem, setItem } from "localforage";

export const fetchUserInfos = async () => {
  try {
    const apikey = await getItem("apikey");
    console.log("api key :", apikey);
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
