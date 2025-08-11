import { getCurrentUserId } from "@/store/userSlice";
import { displayDate } from "@/utils/displayDate";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { X } from "lucide-react";
import type { FC } from "react";
import { useSelector } from "react-redux";

type CommentProps = {
  content: string;
  created_at: number;
  _id: string;
  userId: string;
  dishId: number;
  name: string;
  img: string;
  onRemove: (id: string) => void;
};

const CommentComponent: FC<CommentProps> = ({
  content,
  created_at: created,
  _id: id,
  userId,
  img,
  name,
  onRemove,
}) => {
  const myId = useSelector(getCurrentUserId());
  return (
    <Box maxWidth="760px">
      <Card>
        <Flex gap="3" align="center">
          <Avatar size="3" src={img} radius="full" fallback="T" />
          <Box style={{ flex: 1 }}>
            <Flex justify={"between"} align="center">
              <Text as="div" size="2" weight="bold">
                {name}
              </Text>
              <Text ml="3" as="div" size="2" color="gray">
                {displayDate(created)}
              </Text>
              {userId === myId ? (
                <button
                  style={{
                    marginLeft: "auto",
                    cursor: "pointer",
                  }}
                  onClick={() => onRemove(id)}
                >
                  <X />
                </button>
              ) : (
                <button
                  style={{
                    marginLeft: "auto",
                  }}
                />
              )}
            </Flex>
            <Text as="div" size="2" color="gray">
              {content}
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default CommentComponent;
