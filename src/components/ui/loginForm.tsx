import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../common/card";
import { Button } from "../common/button";
import { Label } from "../common/label";
import { Input } from "../common/input";
import { useEffect, useState, type FC, type FormEvent } from "react";
import { Checkbox } from "../common/checkbox";
import { Flex, Text } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "@/store/userSlice";
import type { ErrorsState } from "./registerForm";
import { validator } from "@/utils/validator";
import type { AppDispatch } from "@/store/store";
import { useNavigate } from "react-router";

type LoginFormProps = {
  onClick: () => void;
};

type DataState = {
  email: string;
  password: string;
  stayOn: boolean;
};

type LoginFormFieldName = "email" | "password" | "stayOn";

const LoginForm: FC<LoginFormProps> = ({ onClick }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });
  const loginError = useSelector(getAuthErrors());
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [errors, setErrors] = useState<ErrorsState>({});

  const handleChange = (target: {
    name: LoginFormFieldName;
    value: string | boolean;
  }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handlePrevInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({
      name: target.name as LoginFormFieldName,
      value: target.value,
    });
  };
  const handlePrevBoxChange = (name: keyof DataState, value: boolean) => {
    handleChange({ name: name, value: !value });
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    dispatch(login({ payload: data, navigate }));
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={onClick}>
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
                value={data.email}
                onChange={handlePrevInputChange}
                required
              />
              {errors.email && (
                <Text as="p" color="red" size={"2"}>
                  {errors.email}
                </Text>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                value={data.password}
                onChange={handlePrevInputChange}
                name="password"
                id="password"
                type="password"
                required
              />
              {errors.password && (
                <Text as="p" color="red" size={"2"}>
                  {errors.password}
                </Text>
              )}
            </div>
            <Flex gap={"3"}>
              <Checkbox
                name="stayOn"
                checked={data.stayOn}
                onClick={() => handlePrevBoxChange("stayOn", data.stayOn)}
                id="terms"
              />
              <Label htmlFor="terms">stay at system</Label>
            </Flex>
            {loginError && <Text color="red">{loginError}</Text>}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="login-form" type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
