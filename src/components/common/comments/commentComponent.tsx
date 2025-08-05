import { displayDate } from "@/utils/displayDate";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { X } from "lucide-react";
import type { FC } from "react";

type CommentProps = {
  content: string;
  created_at: number;
  _id: string;
  dishId: number;
  name: string;
  img: string;
  onRemove: (id: string) => void;
};

const CommentComponent: FC<CommentProps> = ({
  content,
  created_at: created,
  _id: id,
  // dishId,
  img,
  name,
  onRemove,
}) => {
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
              <button
                style={{
                  marginLeft: "auto",
                  cursor: "pointer",
                }}
                onClick={() => onRemove(id)}
              >
                <X />
              </button>
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
