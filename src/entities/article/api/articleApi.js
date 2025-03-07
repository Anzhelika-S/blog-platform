import { api } from "shared/api/apiConfig";

export const getArticle = async (slug) => {
  const response = await api.get(`/articles/${slug}`);
  return response.data;
};

export const createArticle = async (article, token) => {
  const response = await api.post("/articles", article, { headers: { Authorization: `Token ${token}` } });
  return response.data;
};

export const deleteArticle = async (slug, token) => {
  const response = await api.delete(`/articles/${slug}`, { headers: { Authorization: `Token ${token}` } });
  return response.data;
};
