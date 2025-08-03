import { useLocation } from "react-router-dom";
import type { Meal } from "../ui/homeSection";

function DetailDishPage() {
  const location = useLocation();
  const meal = location.state as Meal;
  return <p>Next version</p>;
}

export default DetailDishPage;
