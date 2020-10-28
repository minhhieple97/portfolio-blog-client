import axios from "axios";
import { useApiHandler } from ".";
import useSWR from "swr";
import { fetched } from "./";
export const createPortfolio = (data) => axios.post("/api/v1/portfolios", data);
export const updatePortfolio = (id, data) =>
  axios.patch(`/api/v1/portfolios/${id}`, data);
export const deletePortfolio = (id) => axios.delete(`/api/v1/portfolios/${id}`);
export const useCreatePortfolio = () => useApiHandler(createPortfolio);
export const useUpdatePortfolio = () => useApiHandler(updatePortfolio);
export const useDeletePortfolio = () => useApiHandler(deletePortfolio);
export const useGetPortfolio = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/v1/portfolios/${id}` : null,
    fetched
  );
  return { data, error, loading: !data && !error, ...rest };
};
