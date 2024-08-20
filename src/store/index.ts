import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import skillReducer from "./reducers/SkillSlice.ts";

const rootReducer = combineReducers({
  skillReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
