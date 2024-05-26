import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { RootState } from "../../store";
import React, { useEffect } from "react";
import { auth, googleProvider } from "../../../../server/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { fetchFilmQuestionsAsync, fetchGeneralQuestionsAsync, fetchHistoryQuestionsAsync, fetchScienceQuestionsAsync, fetchSportQuestionsAsync, fetchTvQuestionsAsync } from "../slices/questionsSlice";
import { fetchSignInWithGoogle, fetchSignOutWithGoogle } from "../slices/usersSlice";
import { AlertDialogSignIn } from "../../ui-components/alertdialog";
import HomeIcon from '@mui/icons-material/Home';
import logo from "../../../assets/horizontalLogo.png"
import firebase from "firebase/compat/app";
import Spinner from "../../ui-components/spinner";
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
    const [isLoading, setIsLoading] = React.useState(false);



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUserSignedIn(true);
                setUserName(user.displayName || '');
                console.log(user.displayName);

            } else {
                setIsUserSignedIn(false);
                setUserName('');
            }
        });

        return () => unsubscribe();
    }, []);



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
                setIsLoading(true)
                await dispatch(fetchGeneralQuestionsAsync())
                navigate('/quiz')
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        } else if (category === "Sport") {
            try {
                setIsLoading(true)
                await dispatch(fetchSportQuestionsAsync())
                navigate('/quiz')
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        } else if (category === "Movies") {
            try {
                setIsLoading(true)
                await dispatch(fetchFilmQuestionsAsync())
                navigate('/quiz')
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        } else if (category === "History") {
            try {
                setIsLoading(true)
                await dispatch(fetchHistoryQuestionsAsync())
                navigate('/quiz')
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        } else if (category === "Television") {
            try {
                setIsLoading(true)
                await dispatch(fetchTvQuestionsAsync())
                navigate('/quiz')
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }

        } else if (category === "Science") {
            try {
                setIsLoading(true)
                await dispatch(fetchScienceQuestionsAsync())
                navigate('/quiz')
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
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
                <img className="logoQuiz" src={logo} style={{ marginTop: "0.5%" }} ></img>
            </div>

            {isLoading ? <Spinner /> : <div className="mainHomeDiv">

                <div className="home-container">
                    <h1>Welcome to QuizWiz!</h1>
                    <p>Are you ready to test your knowledge and have fun? QuizWiz is the ultimate trivia game that will challenge your brain.</p>
                    <ul>
                        <li>Choose from a variety of categories including Science, History, Movies, Sports, and more.</li>
                        <li>Compete with friends and family to see who's the ultimate QuizWiz!</li>
                        <li>Climb the leaderboard to showcase your trivia mastery.</li>
                        <li>In each game you will get 3 lifelines.</li>
                        <li>Answer all questions correctly without using any lifelines to earn an extra 2000 points.</li>
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
                                <MenuItem value={"Television"}>Television</MenuItem>
                                <MenuItem value={"Science"}>Science</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                    {isCategoryNotSelected ? <p style={{ textAlign: "center", color: " red" }}>Please select a category</p> : ""}
                </div>
                <div className="googleButton">
                    {isUserSignedIn ? <GoogleButton label={`Welcome ${userName}`} onClick={signOut} /> : <GoogleButton onClick={signIn} />}
                </div>
                <div className="startBtnDiv">
                    <button className="startButton" onClick={startQuiz}>Play</button>
                </div>

                {openDialog && <AlertDialogSignIn />}
            </div>}
        </div>
    )
}

export default Home