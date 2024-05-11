import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { RootState } from "../../store";
import React, { useEffect } from "react";
import { auth, googleProvider } from "../../../../../server/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { fetchGeneralQuestionsAsync, fetchSportQuestionsAsync } from "../slices/questionsSlice";
import { fetchSignInWithGoogle, fetchSignOutWithGoogle } from "../slices/usersSlice";
import { AlertDialogSignIn } from "../../ui-components/alertdialog";
import HomeIcon from '@mui/icons-material/Home';
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

    function homeButton() {
        try {
            navigate("/home")
        } catch (error) {
            console.log(error);

        }
    }

    async function startQuiz() {
        if (loggedUser === false) {
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

    // useEffect(() => {
    //     if (loggedUser === true) {
    //         setIsUserSignedIn(true)
    //         setUserName(loggedUser.user.displayName)
    //     }
    // }, [])





    return (
        <div>

            <div className="categorySelectDiv">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-simple-select-required-label">Select Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={category}
                            label="Category"
                            onChange={handleChange}
                        >

                            <MenuItem value={"General Questions"}>General Questions</MenuItem>
                            <MenuItem value={"Sport"}>Sport</MenuItem>

                        </Select>
                    </FormControl>
                </Box>
                {isCategoryNotSelected ? <p style={{ textAlign: "center", color: " red" }}>Please select a category</p> : ""}
            </div>

            <div className="startBtnDiv">
                <button className="homeButton" onClick={startQuiz}>Start</button>
            </div>
            <div className="googleButton">
                {isUserSignedIn ? <GoogleButton label={`Welcome ${userName}`} onClick={signOut} /> : <GoogleButton onClick={signIn} />}
            </div>
            {openDialog && <AlertDialogSignIn />}
        </div>
    )
}

export default Home