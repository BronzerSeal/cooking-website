import { CheckboxGroup, Flex, Text } from "@radix-ui/themes";
import type { FC } from "react";

type IngredientsElProps = {
  ingredient: {
    ingredient: string;
    measure: string;
  };
  index: number;
};

const IngredientsEl: FC<IngredientsElProps> = ({ ingredient, index }) => {
  return (
    <Text
      as="label"
      size="4"
      color="orange"
      style={{ color: "black" }}
      mt={"2"}
    >
      <Flex gap="2">
        <CheckboxGroup.Item value={index.toString()} />{" "}
        {`${ingredient.measure} ${ingredient.ingredient}`}
      </Flex>
    </Text>
  );
};

export default IngredientsEl;
