import axios from "axios";

const RANDDOM_DISH_URL = "https://www.themealdb.com/api/json/v1/1/random.php";
const DISH_BY_NAME_URL =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const getDish = {
  getRandomDish: async () => {
    const { data } = await axios.get(RANDDOM_DISH_URL);
    return data.meals[0];
  },
  getDishByName: async ({ name }: { name: string }) => {
    const { data } = await axios.get(`${DISH_BY_NAME_URL}${name}`);
    return data.meals;
  },
};

export default getDish;
