import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import formReducer from "./formSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
});
