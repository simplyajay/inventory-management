import { combineReducers } from "redux";
import authSlice from "./slices/authenticationSlice";

const authenticationReducer = combineReducers({
  authentication: authSlice,
});

export default authenticationReducer;
