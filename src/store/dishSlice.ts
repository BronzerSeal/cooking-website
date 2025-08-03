import type { Meal } from "@/components/ui/homeSection";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type DishState = {
  dishes: Meal[];
  searched: boolean;
};

const initialState: DishState = {
  dishes: [],
  searched: false,
};

const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    setDishes(state, action: PayloadAction<Meal[]>) {
      state.dishes = action.payload;
    },
    addDish(state, action: PayloadAction<Meal>) {
      state.dishes.push(action.payload);
    },
    setSearched(state, action: PayloadAction<boolean>) {
      state.searched = action.payload;
    },
    clearDishes(state) {
      state.dishes = [];
    },
  },
});

export const { setDishes, addDish, setSearched, clearDishes } =
  dishSlice.actions;
export default dishSlice.reducer;
