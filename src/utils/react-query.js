import { useQuery } from "@tanstack/react-query";
import request from "./request";

export const fetcher = async ({ queryKey, pageParam }) => {
  const [url, params] = queryKey;
  const response = (await request.get)(url, {
    params: { ...params, pageParam },
  });
  return response;
};

export const useFetch = (url, params, config) => {
  const context = useQuery({
    queryKey: [url, params],
    queryFn: ({ queryKey }) => fetcher({ queryKey, params }),

    enabled: !!url,
    ...config,
  });

  return context;
};
