import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storeReduser from "./storeSlice";

export const store = configureStore({
  reducer: {
    data: storeReduser,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
