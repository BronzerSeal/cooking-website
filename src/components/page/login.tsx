import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useParams } from "react-router";
import LoginForm from "../ui/loginForm";
import RegisterForm from "../ui/registerForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <Flex justify={"center"} align={"center"}>
      {formType === "register" ? (
        <RegisterForm onClick={toggleFormType} />
      ) : (
        <LoginForm onClick={toggleFormType} />
      )}
    </Flex>
  );
};

export default Login;
