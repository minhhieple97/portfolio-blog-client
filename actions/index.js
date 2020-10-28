import { useState } from "react";
export const fetched = (url) =>
  fetch(url).then(async (response) => {
    const result = await response.json();
    if (response.status !== 200) {
      return Promise.reject(result);
    } else {
      return result;
    }
  });
export const useApiHandler = (apiCallback) => {
  const [reqState, setReqState] = useState({
    error: null,
    data: null,
    loading: false,
  });

  const handler = async (...data) => {
    try {
      setReqState({ error: null, data: null, loading: true });
      const json = await apiCallback(...data);
      setReqState({ error: null, data: json.data, loading: false });
      return json.data;
    } catch (error) {
      console.log("Error handler api: ", error.response);
      const message =
        (error.response && error.response.data) ||
        "Ooops, something went wrong...";
      setReqState({ error: message, data: null, loading: false });
      return Promise.reject(message);
    }
  };
  return [handler, { ...reqState }];
};
