import axios from "axios";
import configFile from "@/config.json";

function transformData(data: any) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : data;
}

const commentHttp = axios.create({
  baseURL: configFile.baseURL,
});

commentHttp.interceptors.request.use(
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

commentHttp.interceptors.response.use((res) => {
  if (configFile.isFireBase) {
    res.data = { content: transformData(res.data) };
  }
  return res;
});

export default commentHttp;
