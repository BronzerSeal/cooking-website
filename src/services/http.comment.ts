import axios from "axios";
import configFile from "@/config.json";

function transformData(data: any) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : data;
}

const http = axios.create({
  baseURL: configFile.baseURL,
});

http.interceptors.request.use(
  async function (config) {
    if (configFile.isFireBase && config.url !== undefined) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use((res) => {
  if (configFile.isFireBase) {
    res.data = { content: transformData(res.data) };
  }
  return res;
});

export const commentHttp = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
export default commentHttp;
