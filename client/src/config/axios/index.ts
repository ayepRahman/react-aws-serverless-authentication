import axios from "axios";

// TODO:: add lambda url api here
export const baseApi = axios.create({
  baseURL: process.env.REACT_APP_AWS_API_URL,
});
