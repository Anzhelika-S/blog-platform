import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticle } from "entities/article/model/articleSlice";

export const useArticle = (slug) => {
  const dispatch = useDispatch();

  const { article, isLoading, error } = useSelector((state) => state.article);

  useEffect(() => {
    if (slug) {
      dispatch(fetchArticle(slug));
    }
  }, [slug, dispatch]);

  return { article, isLoading, error };
};
