import useSWR from "swr";
import { fetched } from "./";
export const useGetUser = () => {
  const { data, error, ...rest } = useSWR(`/api/v1/me`, fetched);
  return { data, error, loading: !data && !error, ...rest };
};
