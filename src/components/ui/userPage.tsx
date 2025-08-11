import userService from "@/services/user.service";
import type { AppDispatch } from "@/store/store";
import { logOut, updateUser } from "@/store/userSlice";
import { Button, Container, Flex, Text, TextArea } from "@radix-ui/themes";
import { useEffect, useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const UserPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", dopInfo: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await userService.getCurrentUser();
        setUser(data.content);
      } catch (error) {
        console.error("Ошибка загрузки пользователя", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleLogOut = () => {
    dispatch(logOut(navigate));
  };

  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleUpdate = () => {
    dispatch(
      updateUser({
        ...user,
        dopInfo: value,
      })
    );
    setUser((prev) => ({ ...prev, dopInfo: value }));
    setValue("");
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <Container>
      <Flex align={"center"} direction={"column"}>
        <img style={{ width: "130px" }} src={user.image} />
        <Text size={"4"} weight={"bold"}>
          {user.name}
        </Text>
        {user.dopInfo && (
          <Text style={{ width: "250px" }} align={"center"} color="gray">
            {user.dopInfo}
          </Text>
        )}
        <Button mt={"4"} color="red" onClick={handleLogOut}>
          Log out
        </Button>

        <Flex direction={"column"} width={"350px"} justify={"center"} mt={"9"}>
          <Text weight={"bold"}>add dop info</Text>
          <TextArea
            value={value}
            onChange={handleValueChange}
            color="orange"
            style={{ width: "350px" }}
            radius="full"
          />
          <Flex justify={"end"} mt={"3"}>
            <Button
              size={"3"}
              color="orange"
              radius="full"
              onClick={handleUpdate}
            >
              Update profile
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default UserPage;
