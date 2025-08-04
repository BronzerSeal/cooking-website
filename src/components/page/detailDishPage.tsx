import { useLocation } from "react-router-dom";
import type { Meal } from "../ui/homeSection";
import { Button, CheckboxGroup, Flex, Text } from "@radix-ui/themes";
import { chefs } from "@/services/getChefs";
import { getRandomNum } from "@/utils/getRandomNum";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import RatingDistribution from "../ui/RatingDistribution";
import { StarRating } from "@/utils/starRating";
import extractIngredients from "@/utils/extractIngredients";
import getDish from "@/services/getDish";
import { useEffect, useState } from "react";

function DetailDishPage() {
  const location = useLocation();
  const [meal, setMeal] = useState<Meal>(location.state);
  const [loading, setLoading] = useState(false);
  const ingredients = extractIngredients(meal);
  const stars = getRandomNum(0.5, 5);
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#171412",
    inactiveFillColor: "#cecdc3ff",
  };

  useEffect(() => {
    const fetchMeal = async () => {
      if (!meal.strInstructions) {
        setLoading(true);
        const data = await getDish.getDishById({ id: meal.idMeal });
        setMeal(data[0]);
        setLoading(false);
      }
    };

    fetchMeal();
  }, [meal]);

  if (!meal || !meal.strInstructions || loading) {
    return <Text>Loading...</Text>;
  }

  const steps = meal.strInstructions
    .split(/(?:\.\s+|\.\n)/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div style={{ width: "820px", marginBottom: "20px" }}>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        width="820px"
        style={{ objectFit: "cover", height: "350px", borderRadius: "15px" }}
      />
      <Flex mt={"5"} mb={"2"} justify={"between"}>
        <Text weight={"bold"} size={"7"}>
          {meal.strMeal}
        </Text>
        <Button
          variant="soft"
          color="gray"
          highContrast
          size={"2"}
          radius="full"
          style={{ width: "85px" }}
        >
          Share
        </Button>
      </Flex>
      <Text color="gray" size={"3"}>
        {chefs[getRandomNum(0, 9, 0)]}
      </Text>
      <Flex
        direction={"row"}
        mt={"4"}
        justify={"between"}
        width={"460px"}
        wrap={"wrap"}
        mb={"2"}
      >
        <Flex direction={"column"}>
          <Text weight={"bold"} style={{ fontSize: "36px" }}>
            {stars}
          </Text>
          <Rating
            style={{ maxWidth: 140 }}
            itemStyles={myStyles}
            value={stars}
            readOnly
          />
          <Text mt={"2"}>{`${getRandomNum(1, 500)} reviews`}</Text>
        </Flex>
        <RatingDistribution ratings={StarRating(stars)} />
      </Flex>

      <Text weight={"bold"} size={"6"}>
        Ingredients
      </Text>
      <Flex direction="column" gap="3" mb={"4"}>
        <CheckboxGroup.Root size="3" mt={"4"}>
          {ingredients.map((ingredient, index) => {
            return (
              <Text
                key={index}
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
          })}
        </CheckboxGroup.Root>
      </Flex>

      <Text as="div" weight={"bold"} size={"6"}>
        Instructions
      </Text>
      {steps.map((step, index) => (
        <Flex key={index} gap="2" align="start" mt={"3"}>
          <Text weight="bold" size="4" style={{ minWidth: "60px" }}>
            Step {index + 1}
          </Text>
          <Text
            size="3"
            color="gray"
            style={{ width: "400px", color: "#9b7d66ff" }}
          >
            {step}.
          </Text>
        </Flex>
      ))}
    </div>
  );
}

export default DetailDishPage;
