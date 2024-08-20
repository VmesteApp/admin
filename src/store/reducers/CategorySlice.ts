import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Skills_Category } from "../../types/skills_category";

interface CategoryState {
  skills: Skills_Category[];
  isLoading: boolean;
  error: string;
}

const initialState: CategoryState = {
  skills: [],
  isLoading: false,
  error: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoriesFetching(state) {
      state.isLoading = true;
    },
    categoriesFetchingSuccess(state, action: PayloadAction<Skills_Category[]>) {
      state.isLoading = false;
      state.error = "";
      state.skills = action.payload;
    },
    categoriesFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default categorySlice.reducer;
