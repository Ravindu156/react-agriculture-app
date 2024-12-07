import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productSlideReducer from "./ProductSlide";

export const store = configureStore({
  reducer: {
    user : userSliceReducer,
    product : productSlideReducer
    
  },
});
