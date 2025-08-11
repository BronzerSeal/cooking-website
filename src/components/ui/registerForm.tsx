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
import { Checkbox } from "../common/checkbox";
import { Flex, Text } from "@radix-ui/themes";
import { useEffect, useState, type FC, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { validator } from "@/utils/validator";
import { signUp } from "@/store/userSlice";
import { useNavigate } from "react-router";
import type { AppDispatch } from "@/store/store";

type RegisterFormProps = {
  onClick: () => void;
};

export type FormFieldName = "email" | "password" | "name" | "licence";

export type ChangeTarget = {
  name: FormFieldName;
  value: string | boolean;
};

type DataState = {
  email: string;
  password: string;
  name: string;
  licence: boolean;
};

export type ErrorsState = Partial<Record<keyof DataState, string>>;

const RegisterForm: FC<RegisterFormProps> = ({ onClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    licence: false,
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ErrorsState>({
    password: "",
    name: "",
    email: "",
  });
  const handleChange = (target: ChangeTarget) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handlePrevInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ name: target.name as FormFieldName, value: target.value });
  };
  const handlePrevBoxChange = (name: keyof DataState, value: boolean) => {
    handleChange({ name: name, value: !value });
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
      min: {
        message: "Имя дожно состоять минимум из 3 символов",
        value: 3,
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число",
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8,
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

    dispatch(signUp({ ...data, navigate }));
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Сreate an account</CardTitle>
        <CardDescription>
          Fill in all fields to create an account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={onClick}>
            Sign In
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={data.email}
                onChange={handlePrevInputChange}
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              {errors.email && (
                <Text as="p" color="red" size={"2"}>
                  {errors.email}
                </Text>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">name</Label>
              <Input
                value={data.name}
                onChange={handlePrevInputChange}
                name="name"
                id="name"
                type="name"
                placeholder="My name"
                required
              />
              {errors.name && (
                <Text as="p" color="red" size={"2"}>
                  {errors.name}
                </Text>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                value={data.password}
                onChange={handlePrevInputChange}
                name="password"
                id="password"
                type="password"
                placeholder="Test1234!"
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
                name="licence"
                checked={data.licence}
                onClick={() => handlePrevBoxChange("licence", data.licence)}
                id="terms"
              />
              <Label htmlFor="terms">Confirm the license agreement</Label>
            </Flex>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="register-form" className="w-full">
          Create account
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
