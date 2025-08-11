import commentHttp from "./http.comment";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

export type CreateProps = {
  email: string;
  image: string;
  licence: boolean;
  name: string;
  _id: String;
};

type UpdateProps = {
  email: string;
  image: string;
  name: string;
  _id: string;
  licence: boolean;
  dopInfo?: string;
};

const userService = {
  get: async () => {
    const { data } = await commentHttp.get(userEndpoint);
    return data;
  },
  create: async (payload: CreateProps) => {
    const { data } = await commentHttp.put(userEndpoint + payload._id, payload);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await commentHttp.get(
      userEndpoint + localStorageService.getUserId()
    );
    return data;
  },
  update: async (payload: UpdateProps) => {
    const { data } = await commentHttp.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    );
    return data;
  },
};
export default userService;
