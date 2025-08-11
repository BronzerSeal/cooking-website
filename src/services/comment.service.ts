import type { CommentProps } from "@/store/commentsSlice";
import commentHttp from "./http.comment";
const commentEndpoint = "comment/";

const commentService = {
  createComment: async (payload: CommentProps) => {
    console.log(payload);
    const { data } = await commentHttp.put(
      commentEndpoint + payload._id,
      payload
    );
    return data;
  },
  getComments: async (dishId: string) => {
    const { data } = await commentHttp.get(commentEndpoint, {
      params: {
        orderBy: `"dishId"`,
        equalTo: `${dishId}`,
      },
    });
    return data;
  },
  removeComment: async (commentId: string) => {
    const { data } = await commentHttp.delete(commentEndpoint + commentId);
    return data;
  },
};

export default commentService;
