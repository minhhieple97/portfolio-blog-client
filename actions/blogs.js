import axios from "axios";
import { useApiHandler } from ".";
import useSWR from "swr";
import { fetched } from "./";
export const createBlog = (data) => axios.post("/api/v1/blogs", data);
export const updateBlog = (id, data) =>
  axios.patch(`/api/v1/blogs/${id}`, data);
export const deleteBlog = (id) => axios.delete(`/api/v1/blogs/${id}`);
export const useCreateBlog = () => useApiHandler(createBlog);
export const useUpdateBlog = () => useApiHandler(updateBlog);
export const useDeleteBlog = () => useApiHandler(deleteBlog);
export const useGetBlog = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/v1/blogs/${id}` : null,
    fetched
  );
  return { data, error, loading: !data && !error, ...rest };
};
export const useGetBlogs = () => {
  const { data, error, ...rest } = useSWR(`/api/v1/blogs`, fetched);
  return { data, error, loading: !data && !error, ...rest };
};
export const useGetUserBlogs = () => {
  const { data, error, ...rest } = useSWR(`/api/v1/blogs/me`, fetched);
  return { data, error, loading: !data && !error, ...rest };
};
