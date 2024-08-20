import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Skills } from "../../types/skills";

interface SkillsState {
  skills: Skills[];
  isLoading: boolean;
  error: string;
}

const initialState: SkillsState = {
  skills: [],
  isLoading: false,
  error: "",
};

export const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    skillsFetching(state) {
      state.isLoading = true;
    },
    skillsFetchingSuccess(state, action: PayloadAction<Skills[]>) {
      state.isLoading = false;
      state.error = "";
      state.skills = action.payload;
    },
    skillsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default skillSlice.reducer;
