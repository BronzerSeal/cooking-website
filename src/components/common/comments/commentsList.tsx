import type { CommentProps } from "@/store/commentsSlice";
import CommentComponent from "./commentComponent";
import type { FC } from "react";

type CommentsListProps = {
  comments: CommentProps[];
  onRemove: (id: string) => void;
};

const CommentsList: FC<CommentsListProps> = ({ comments, onRemove }) => {
  return comments.map((comment) => (
    <CommentComponent key={comment._id} {...comment} onRemove={onRemove} />
  ));
};

export default CommentsList;
