import { useLocation } from "react-router-dom";
import type { Meal } from "../ui/homeSection";
import { Button, Flex, Text } from "@radix-ui/themes";
import { chefs } from "@/services/getChefs";
import { getRandomNum } from "@/utils/getRandomNum";
import "@smastrom/react-rating/style.css";
import getDish from "@/services/getDish";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loadCommentsList } from "@/store/commentsSlice";
import type { AppDispatch } from "@/store/store";
import Comments from "../ui/comments";
import Instruction from "../ui/instruction";
import Ingredients from "../ui/ingredients";
import RatingBlock from "../ui/ratingBlock";

function DetailDishPage() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [meal, setMeal] = useState<Meal>(location.state);
  const [loading, setLoading] = useState(false);
  const urlToCopy = window.location.href;

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

    dispatch(loadCommentsList(meal.idMeal));
  }, [meal]);

  if (!meal || !meal.strInstructions || loading) {
    return <Text>Loading...</Text>;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(urlToCopy).then(() => {
      toast("Url copy to clickboard");
    });
  };

  return (
    <div style={{ width: "820px", marginBottom: "90px" }}>
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
          onClick={copyToClipboard}
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
        <RatingBlock />
      </Flex>

      <Ingredients meal={meal} />

      <Instruction instruction={meal.strInstructions} />

      <Comments id={+meal.idMeal} />
    </div>
  );
}

export default DetailDishPage;
