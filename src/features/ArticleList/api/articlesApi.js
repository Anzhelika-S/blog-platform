import { api } from "shared/api/apiConfig";

export const fetchArticles = async (page) => {
  const response = await api.get(`/articles?offset=${page}&limit=20`);
  return response.data;
};

export const fetchFavorited = async (username) => {
  const response = await api.get(`/articles?favorited=${username}`);
  return response.data;
};
