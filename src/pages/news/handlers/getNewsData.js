import { useFetch } from "../../../utils/react-query";

export const useGetNewsData = () => {
  const response = useFetch(
    `https://newsapi.org/v2/top-headlines?country=au&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
  );
  return {
    ...response,
    data: response?.data?.data,
  };
};

export const useGetNewsDataByCategory = (category) => {
  const response = useFetch(
    `https://newsapi.org/v2/everything?q=${category}&from=2024-03-01&sortBy=popularity&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
  );
  return {
    ...response,
    data: response?.data?.data,
  };
};
