import * as jose from "jose";
import { setItem } from "localforage";
import { redirect } from "react-router-dom";

export const verifyJwt = async (userJwt) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jose.jwtVerify(userJwt, secret);
  console.log("JWT PAYLOAD", payload);
  const { apikey, id } = payload;
  if (!apikey || !id) {
    throw new Error("Missing apikey or id");
  }
  await setItem("apikey", apikey);
};
