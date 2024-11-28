import { combineReducers } from "redux";
import authSlice from "./slices/authenticationSlice";
import productSlice from "./slices/productSlice";

const rootReducer = combineReducers({
  authentication: authSlice,
  product: productSlice,
});

export default rootReducer;
