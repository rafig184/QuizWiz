import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllFilmQuestions, getAllGeneralQuestions, getAllHistoryQuestions, getAllScienceQuestions, getAllSportQuestions, getAllTVQuestions } from "../home/api/api"



const initialState = {
    questions: [] as any,
    timeIsUp: false

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
export const fetchFilmQuestionsAsync = createAsyncThunk(
    "home/getAllFilmQuestions",
    async () => {
        const response = await getAllFilmQuestions()
        return response
    }
)
export const fetchHistoryQuestionsAsync = createAsyncThunk(
    "home/getAllHistoryQuestions",
    async () => {
        const response = await getAllHistoryQuestions()
        return response
    }
)
export const fetchTvQuestionsAsync = createAsyncThunk(
    "home/getAllTVQuestions",
    async () => {
        const response = await getAllTVQuestions()
        return response
    }
)
export const fetchScienceQuestionsAsync = createAsyncThunk(
    "home/getAllScienceQuestions",
    async () => {
        const response = await getAllScienceQuestions()
        return response
    }
)




export const questionsSlice = createSlice({
    name: "questions",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setTimeIsUp: (state, action) => {
            state.timeIsUp = action.payload;
        },

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

        builder
            .addCase(fetchFilmQuestionsAsync.pending, (state) => {
                state.questions = []
            })

            .addCase(fetchFilmQuestionsAsync.fulfilled, (state, action) => {
                state.questions = action.payload
            })

            .addCase(fetchFilmQuestionsAsync.rejected, (state) => {
                state.questions = []
            })
        builder
            .addCase(fetchHistoryQuestionsAsync.pending, (state) => {
                state.questions = []
            })

            .addCase(fetchHistoryQuestionsAsync.fulfilled, (state, action) => {
                state.questions = action.payload
            })

            .addCase(fetchHistoryQuestionsAsync.rejected, (state) => {
                state.questions = []
            })
        builder
            .addCase(fetchTvQuestionsAsync.pending, (state) => {
                state.questions = []
            })

            .addCase(fetchTvQuestionsAsync.fulfilled, (state, action) => {
                state.questions = action.payload
            })

            .addCase(fetchTvQuestionsAsync.rejected, (state) => {
                state.questions = []
            })
        builder
            .addCase(fetchScienceQuestionsAsync.pending, (state) => {
                state.questions = []
            })

            .addCase(fetchScienceQuestionsAsync.fulfilled, (state, action) => {
                state.questions = action.payload
            })

            .addCase(fetchScienceQuestionsAsync.rejected, (state) => {
                state.questions = []
            })

    },

})



// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const { setTimeIsUp } = questionsSlice.actions;
export default questionsSlice.reducer