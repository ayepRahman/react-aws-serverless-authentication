import { baseApi } from "config";

export const signUp = async () => {
  // will add lambda call here
  return await baseApi.post("/signup");
};
