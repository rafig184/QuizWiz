import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import questionsSlice from "./components/slices/questionsSlice"



export const store = configureStore({
  reducer: {
    questions: questionsSlice,

  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>