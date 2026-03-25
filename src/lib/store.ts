
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import productReducer from "./features/product/productSlice";
import { fakeStoreApi } from "./features/api/api";
import { productApi } from "./features/product/productApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [productApi.reducerPath]: productApi.reducer,
      counter: counterSlice,
      product: productReducer,
    },
    // get defualt middleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fakeStoreApi.middleware)

  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

