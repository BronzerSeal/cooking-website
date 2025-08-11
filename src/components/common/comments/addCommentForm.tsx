import userService from "@/services/user.service";
import { validator } from "@/utils/validator";
import { Button, Flex, Text, TextArea } from "@radix-ui/themes";
import { useEffect, useState, type FC } from "react";

type CommentData = {
  content: string;
  name: string;
  img: string;
  userId: string;
};
type AddCommentFormProps = {
  onSubmit: (data: CommentData) => void;
};
type User = {
  name: string;
  image: string;
  _id: string;
};

const AddCommentForm: FC<AddCommentFormProps> = ({ onSubmit }) => {
  const [user, setUser] = useState<User>({ name: "", image: "", _id: "" });
  const [data, setData] = useState<{ content: string }>({ content: "" });
  const [errors, setErrors] = useState<{ content?: string }>({ content: "" });

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await userService.getCurrentUser();
        setUser(data.content);
      } catch (error) {
        console.error("Ошибка загрузки пользователя", error);
      }
    }
    fetchUser();
  }, []);

  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым",
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData({ content: "" });
    setErrors({ content: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    onSubmit({ ...data, name: user.name, img: user.image, userId: user._id });
    clearForm();
  };

  return (
    <Flex direction={"column"} maxWidth={"760px"}>
      <Text as="div" weight={"bold"} size={"6"} mt={"3"}>
        Your review
      </Text>
      <form onSubmit={handleSubmit}>
        <TextArea
          value={data.content || ""}
          onChange={handleChange}
          mt={"3"}
          name="content"
          placeholder="Your feedback…"
          size={"3"}
          style={{ maxWidth: "450px", height: "150px" }}
        />
        {errors && <Text color="red">{errors.content}</Text>}
        <Flex justify={"end"} mt={"3"}>
          <Button size={"3"} color="orange" radius="full">
            Submit review
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default AddCommentForm;
