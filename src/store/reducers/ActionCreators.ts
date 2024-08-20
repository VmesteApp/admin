import { AppDispatch } from "..";
import { Skills } from "../../types/skills";
import axios from "axios";
import { skillSlice } from "./SkillSlice";
import { categorySlice } from "./CategorySlice";

export const fetchSkills = async (dispatch: AppDispatch) => {
  try {
    dispatch(skillSlice.actions.skillsFetching());
    const response = await axios.get<Skills[]>(
      "https://jsonplaceholder.typicode.com/users",
    );
    dispatch(skillSlice.actions.skillsFetchingSuccess(response.data));
  } catch (e) {
    dispatch(skillSlice.actions.skillsFetchingError("Не удалось"));
  }
};

export const fetchCategories = async (dispatch: AppDispatch) => {
  try {
    dispatch(categorySlice.actions.categoriesFetching());
    const response = await axios.get<Skills[]>(
      "https://jsonplaceholder.typicode.com/users",
    );
    dispatch(categorySlice.actions.categoriesFetchingSuccess(response.data));
  } catch (e) {
    dispatch(categorySlice.actions.categoriesFetchingError("Не удалось"));
  }
};
