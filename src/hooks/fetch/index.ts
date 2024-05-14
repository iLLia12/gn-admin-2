import useSWR, { preload } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFetch = (path: string) => {
  return useSWR(path, fetcher);
};

export const prefetch = (path: string) => {
  return preload(path, fetcher);
};
