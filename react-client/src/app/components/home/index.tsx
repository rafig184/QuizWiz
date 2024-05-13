import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { RootState } from "../../store";
import React, { useEffect } from "react";
import { auth, googleProvider } from "../../../../../server/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { fetchFilmQuestionsAsync, fetchGeneralQuestionsAsync, fetchHistoryQuestionsAsync, fetchSportQuestionsAsync } from "../slices/questionsSlice";
import { fetchSignInWithGoogle, fetchSignOutWithGoogle } from "../slices/usersSlice";
import { AlertDialogSignIn } from "../../ui-components/alertdialog";
import HomeIcon from '@mui/icons-material/Home';
import logo from "../../../assets/logo.png"
// import {  GoogleIcon } from '@mui/icons-material/Google';



const Home = () => {

    const dispatch = useAppDispatch();
    const loggedUser = useSelector((state: RootState) => state.loggedUser.loggedUser);

    const questions = useSelector((state: RootState) => state.questions.questions);
    const navigate = useNavigate()
    const [category, setCategory] = React.useState('');
    const [userName, setUserName] = React.useState('');

    const [isCategoryNotSelected, setIsCategoryNotSelected] = React.useState(false);
    const [isUserSignedIn, setIsUserSignedIn] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);



    async function startQuiz() {
        if (isUserSignedIn === false) {
            setOpenDialog(true)
            return
        }


        if (category === "") {
            setIsCategoryNotSelected(true)
        }

        if (category === "General Questions") {
            try {
                await dispatch(fetchGeneralQuestionsAsync())
                navigate('/quiz')
            } catch (error) {
                console.log(error);
            }
        } else if (category === "Sport") {
            try {
                await dispatch(fetchSportQuestionsAsync())
                navigate('/quiz')
            } catch (error) {
                console.log(error);
            }
        } else if (category === "Movies") {
            try {
                await dispatch(fetchFilmQuestionsAsync())
                navigate('/quiz')
            } catch (error) {
                console.log(error);
            }
        } else if (category === "History") {
            try {
                await dispatch(fetchHistoryQuestionsAsync())
                navigate('/quiz')
            } catch (error) {
                console.log(error);
            }
        }

    }

    async function signIn() {
        try {
            const result = await dispatch(fetchSignInWithGoogle())
            console.log(result);
            setIsUserSignedIn(true)
            const username = result.payload as any
            setUserName(username.user.displayName)

        } catch (error) {
            console.log(error);

        }
    }



    async function signOut() {
        try {
            const result = await dispatch(fetchSignOutWithGoogle())
            console.log(result);
            setIsUserSignedIn(false)
            setUserName("")
        } catch (error) {
            console.log(error);
        }
    }

    console.log(loggedUser);


    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
        setIsCategoryNotSelected(false)
        console.log(event.target.value);

    };





    return (
        <div>
            <div className="header">
                <img className="logo" src={logo} width={200}></img>
            </div>

            <div className="mainHomeDiv">

                <div className="home-container">
                    <h1>Welcome to QuizWiz!</h1>
                    <p>Are you ready to test your knowledge and have fun? QuizWiz is the ultimate trivia game that will challenge your brain with a wide range of exciting questions across various categories.</p>
                    <ul>
                        <li>Choose from a variety of categories including Science, History, Movies, Sports, and more.</li>
                        <li>Compete with friends and family to see who's the ultimate QuizWiz!</li>
                        <li>Climb the leaderboard to showcase your trivia mastery.</li>
                    </ul>
                    <p>Get started now and embark on a journey of knowledge and entertainment with QuizWiz!</p>
                    <p>But first, Sign in with your Google Account.</p>
                </div>
                <div className="categorySelectDiv">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl required fullWidth variant="filled" sx={{ borderRadius: '5px', backgroundColor: '#f5f5f5' }}>
                            <InputLabel id="demo-simple-select-required-label">Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={category}
                                label="Category"
                                onChange={handleChange}
                                sx={{ backgroundColor: '#f5f5f5' }}
                            >

                                <MenuItem value={"General Questions"}>General Questions</MenuItem>
                                <MenuItem value={"Sport"}>Sport</MenuItem>
                                <MenuItem value={"Movies"}>Movies</MenuItem>
                                <MenuItem value={"History"}>History</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                    {isCategoryNotSelected ? <p style={{ textAlign: "center", color: " red" }}>Please select a category</p> : ""}
                </div>
                <div className="googleButton">
                    {isUserSignedIn ? <GoogleButton label={`Welcome ${userName}`} onClick={signOut} /> : <GoogleButton onClick={signIn} />}
                </div>
                <div className="startBtnDiv">
                    <button className="homeButton" onClick={startQuiz}>Start</button>
                </div>

                {openDialog && <AlertDialogSignIn />}
            </div>
        </div>
    )
}

export default Home