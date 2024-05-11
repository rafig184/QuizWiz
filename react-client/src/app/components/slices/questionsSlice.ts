import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllGeneralQuestions, getAllSportQuestions } from "../home/api/api"



const initialState = {
    questions: [] as any,

}

export const fetchGeneralQuestionsAsync = createAsyncThunk(
    "home/getAllGeneralQuestions",
    async () => {
        const response = await getAllGeneralQuestions()
        return response
    }
)

export const fetchSportQuestionsAsync = createAsyncThunk(
    "home/getAllSportQuestions",
    async () => {
        const response = await getAllSportQuestions()
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
            .addCase(fetchGeneralQuestionsAsync.pending, (state) => {
                state.questions = []
            })

            .addCase(fetchGeneralQuestionsAsync.fulfilled, (state, action) => {
                state.questions = action.payload
            })

            .addCase(fetchGeneralQuestionsAsync.rejected, (state) => {
                state.questions = []
            })


        builder
            .addCase(fetchSportQuestionsAsync.pending, (state) => {
                state.questions = []
            })

            .addCase(fetchSportQuestionsAsync.fulfilled, (state, action) => {
                state.questions = action.payload
            })

            .addCase(fetchSportQuestionsAsync.rejected, (state) => {
                state.questions = []
            })
    },

})



// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default questionsSlice.reducer