import { CheckboxGroup, Flex, Text } from "@radix-ui/themes";
import IngredientsEl from "./ingredientsEl";
import extractIngredients from "@/utils/extractIngredients";
import type { Meal } from "./homeSection";
import type { FC } from "react";

type IngredientsProps = {
  meal: Meal;
};

const Ingredients: FC<IngredientsProps> = ({ meal }) => {
  const ingredients = extractIngredients(meal);

  return (
    <>
      <Text weight={"bold"} size={"6"}>
        Ingredients
      </Text>
      <Flex direction="column" gap="3" mb={"4"}>
        <CheckboxGroup.Root size="3" mt={"4"}>
          {ingredients.map((ingredient, index) => (
            <IngredientsEl key={index} ingredient={ingredient} index={index} />
          ))}
        </CheckboxGroup.Root>
      </Flex>
    </>
  );
};

export default Ingredients;
