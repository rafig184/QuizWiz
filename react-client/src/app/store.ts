import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import questionsSlice from "./components/slices/questionsSlice"
import usersSlice from "./components/slices/usersSlice"



export const store = configureStore({
  reducer: {
    questions: questionsSlice,
    loggedUser: usersSlice

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