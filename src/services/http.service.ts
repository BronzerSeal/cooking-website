import axios from "axios";
import configFile from "@/config.json";
import { toast } from "react-toastify";

axios.defaults.url = configFile.baseURL;

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      toast.error("Something was wrong. Try it later");
    }
    return Promise.reject(error);
  }
);
const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
export default httpService;
