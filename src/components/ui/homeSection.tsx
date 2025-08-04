import { Flex, Text, TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";
import HomePageFoodEl from "../common/homePageFoodEl";
import getDish from "@/services/getDish";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { setDishes, addDish, setSearched } from "@/store/dishSlice";
import { useNavigate } from "react-router-dom";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;

  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;

  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
};

function HomeSection() {
  const dish = useSelector((state: RootState) => state.dish.dishes);
  const search = useSelector((state: RootState) => state.dish.searched);
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");
  const [inputColor, setInputColor] = useState<"brown" | "red">("brown");
  const mainPageDishes = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlusDish = async () => {
      const data = await getDish.getRandomDish();
      dispatch(addDish(data));
    };
    for (let i = 0; i < mainPageDishes; i++) {
      fetchPlusDish();
    }
  }, []);

  const valueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const data = await getDish.getDishByName({ name: value });
      if (data) {
        dispatch(setDishes(data));
        dispatch(setSearched(true));
        setInputColor("brown");
      } else {
        setInputColor("red");
        setValue("Not found");
      }
    }
  };

  const handleCardClick = (meal: Meal) => {
    navigate("/dish", { state: meal });
  };

  return (
    <Flex direction={"column"} width={"880px"}>
      <TextField.Root
        placeholder="Search for recipes"
        radius={"large"}
        size="3"
        color={inputColor}
        variant="soft"
        style={{ height: "48px", fontSize: "16px" }}
        value={value}
        onChange={valueChange}
        onKeyDown={handleSearch}
      >
        <TextField.Slot>
          <Search size={"20"} />
        </TextField.Slot>
      </TextField.Root>
      <br />

      <Text weight={"bold"} size={"6"}>
        Recipes
      </Text>
      <br />
      {dish.length === 0 && <p>Didn't find your dish, try other filters</p>}
      {!search ? (
        <Flex gap="4" wrap="wrap">
          {dish.slice(0, 4).map((meal, index) => (
            <HomePageFoodEl
              key={meal.idMeal || index}
              img={meal.strMealThumb}
              name={meal.strMeal}
              onClick={() => handleCardClick(meal)}
            />
          ))}
        </Flex>
      ) : (
        <Flex gap="4" wrap="wrap">
          {dish.map((meal, index) => (
            <HomePageFoodEl
              key={meal.idMeal || index}
              img={meal.strMealThumb}
              name={meal.strMeal}
              onClick={() => handleCardClick(meal)}
            />
          ))}
        </Flex>
      )}

      <br />

      {!search && (
        <>
          <Text weight={"bold"} size={"6"}>
            Popular Recipes
          </Text>
          <Flex gap="4" wrap="wrap">
            {dish.slice(4, 8).map((meal, index) => (
              <HomePageFoodEl
                key={meal.idMeal || index}
                img={meal.strMealThumb}
                name={meal.strMeal}
                onClick={() => handleCardClick(meal)}
              />
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
}

export default HomeSection;
