import axios from "axios";

export const api = axios.create({
  baseURL: "https://blog-platform.kata.academy/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
