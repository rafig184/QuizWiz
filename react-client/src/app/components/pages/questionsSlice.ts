import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllQuestions } from "../home/api/api"



const initialState = {
    genQuestions: [] as any,
}

export const fetchQuestionsAsync = createAsyncThunk(
    "home/getAllQuestions",
    async () => {
        const response = await getAllQuestions()
        return response
    }
)




export const questionsSlice = createSlice({
    name: "questions",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestionsAsync.pending, (state) => {
                state.genQuestions = []
            })

            .addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
                state.genQuestions = action.payload
            })

            .addCase(fetchQuestionsAsync.rejected, (state) => {
                state.genQuestions = []
            })
    },

})



// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default questionsSlice.reducer