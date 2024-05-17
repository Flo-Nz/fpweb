import * as jose from "jose";
import { setItem } from "localforage";

export const verifyJwt = async (userJwt) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jose.jwtVerify(userJwt, secret);

  const { apikey, id } = payload;
  if (!apikey || !id) {
    throw new Error("Missing apikey or id");
  }
  await setItem("apikey", apikey);
};
