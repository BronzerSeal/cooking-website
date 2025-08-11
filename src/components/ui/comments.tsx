import { Flex, Text } from "@radix-ui/themes";
import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getComments,
  removeComment,
} from "@/store/commentsSlice";
import type { FC } from "react";
import type { AppDispatch } from "@/store/store";
import { getIsLoggedIn } from "@/store/userSlice";

type comType = {
  id: number;
};

const Comments: FC<comType> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector(getComments());
  const isLoggedIn = useSelector(getIsLoggedIn());
  const handleSubmit = (data: { content: string }) => {
    dispatch(createComment({ ...data, dishId: id }));
  };
  const handleRemoveComment = (id: string) => {
    dispatch(removeComment(id));
  };

  return (
    <>
      <Text as="div" weight={"bold"} size={"6"} mt={"3"}>
        Comments
      </Text>
      <Flex direction={"column"} gap={"3"} mt={"3"}>
        {comments.length > 0 ? (
          <CommentsList comments={comments} onRemove={handleRemoveComment} />
        ) : (
          <Text>No comments yet...</Text>
        )}
      </Flex>
      {isLoggedIn ? (
        <AddCommentForm onSubmit={handleSubmit} />
      ) : (
        <Text as="div" size={"4"} weight={"bold"} mt={"4"}>
          Enter to post comments
        </Text>
      )}
    </>
  );
};

export default Comments;
