import commentService from "@/services/comment.service";
import { createAction, createSlice, type Dispatch } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";

export type CommentProps = {
  content: string;
  created_at: number;
  dishId: number;
  name: string;
  _id: string;
  img: string;
};

type CommentsState = {
  entities: CommentProps[];
  isLoading: boolean;
  error: string | null;
};

const initialState: CommentsState = {
  entities: [],
  isLoading: true,
  error: null,
};

type payload = {
  content: string;
  dishId: number;
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    },
  },
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentRemoved,
} = actions;

const addCommentRequested = createAction<payload>(
  "comments/addCommentRequested"
);
const removeCommentRequested = createAction("comments/addCommentRequested");

export const loadCommentsList =
  (dishId: string) => async (dispatch: Dispatch) => {
    dispatch(commentsRequested());
    try {
      const { content } = await commentService.getComments(dishId);
      dispatch(commentsReceived(content));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(commentsRequestFailed(error.message));
      } else {
        dispatch(commentsRequestFailed("Unknown error"));
      }
    }
  };

export const createComment =
  (payload: payload) => async (dispatch: Dispatch) => {
    dispatch(addCommentRequested(payload));
    const comment = {
      ...payload,
      _id: nanoid(),
      created_at: Date.now(),
      name: faker.internet.username(),
      img: `https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random()}`,
    };
    try {
      const { content } = await commentService.createComment(comment);
      dispatch(commentCreated(content));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(commentsRequestFailed(error.message));
      } else {
        dispatch(commentsRequestFailed("Unknown error"));
      }
    }
  };

export const removeComment = (id: string) => async (dispatch: Dispatch) => {
  dispatch(removeCommentRequested());
  try {
    const { content } = await commentService.removeComment(id);
    if (content === null) {
      dispatch(commentRemoved(id));
    }
  } catch (error) {
    if (error instanceof Error) {
      dispatch(commentsRequestFailed(error.message));
    } else {
      dispatch(commentsRequestFailed("Unknown error"));
    }
  }
};

export const getComments = () => (state: RootState) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state: RootState) =>
  state.comments.isLoading;

export default commentsReducer;
