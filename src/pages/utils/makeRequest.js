import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://freelance-036t.onrender.com/api",
  withCredentials: true,
});
// https://freelance-036t.onrender.com/api ||
