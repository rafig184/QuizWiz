import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllGeneralQuestions, getAllSportQuestions, signInWithGoogle, signOutWithGoogle } from "../home/api/api"
import { getScoreBoardService } from "../scoreBoard/api/index"



const initialState = {
    loggedUser: [] as any,
    scoreBoard: [] as any

}



export const fetchSignInWithGoogle = createAsyncThunk(
    "home/signInWithGoogle",
    async () => {
        const response = await signInWithGoogle()
        return response
    }
)
export const fetchSignOutWithGoogle = createAsyncThunk(
    "home/signOutWithGoogle",
    async () => {
        const response = await signOutWithGoogle()
        return []
    }
)
export const fetchScoreboard = createAsyncThunk(
    "scoreBoard/getScoreBoardService",
    async () => {
        const response = await getScoreBoardService()
        return response
    }
)




export const usersSlice = createSlice({
    name: "loggedUser",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSignInWithGoogle.pending, (state) => {
                state.loggedUser = []
            })

            .addCase(fetchSignInWithGoogle.fulfilled, (state, action) => {
                state.loggedUser = action.payload
            })

            .addCase(fetchSignInWithGoogle.rejected, (state) => {
                state.loggedUser = []
            })

        builder
            .addCase(fetchSignOutWithGoogle.pending, (state) => {
                state.loggedUser = []
            })

            .addCase(fetchSignOutWithGoogle.fulfilled, (state, action) => {
                state.loggedUser = action.payload
            })

            .addCase(fetchSignOutWithGoogle.rejected, (state) => {
                state.loggedUser = []
            })

        builder
            .addCase(fetchScoreboard.pending, (state) => {
                state.scoreBoard = []
            })

            .addCase(fetchScoreboard.fulfilled, (state, action) => {
                state.scoreBoard = action.payload
            })

            .addCase(fetchScoreboard.rejected, (state) => {
                state.scoreBoard = []
            })

    },

})




export default usersSlice.reducer