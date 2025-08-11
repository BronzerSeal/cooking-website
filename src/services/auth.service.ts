import axios from "axios";
import localStorageService from "./localStorage.service";
import Config from "@/config.json";

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: Config.key,
  },
});

type authProps = {
  email: string;
  password: string;
};

const authService = {
  register: async ({ email, password }: authProps) => {
    const { data } = await httpAuth.post("accounts:signUp", {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  login: async ({ email, password }: authProps) => {
    const { data } = await httpAuth.post("accounts:signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
