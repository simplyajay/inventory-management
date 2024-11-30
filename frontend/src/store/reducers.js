import { combineReducers } from "redux";
import authSlice from "./slices/authenticationSlice";

const rootReducer = combineReducers({
  authentication: authSlice,
});

export default rootReducer;
