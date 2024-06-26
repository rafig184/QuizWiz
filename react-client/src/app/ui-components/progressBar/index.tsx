import {
    Box,
    LinearProgress,
    linearProgressClasses,
    Typography
} from "@mui/material";
import moment from "moment";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertDialogTime } from "../alertdialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setTimeIsUp } from "../../components/slices/questionsSlice";
import { useGlobalAudioPlayer } from 'react-use-audio-player';


const SubmitTimeProgressBar = () => {
    const timeIsUp = useSelector((state: RootState) => state.questions.timeIsUp);

    const initialTime = 30; // in seconds
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [progressBarPercent, setProgressBarPercent] = useState(0);
    const navigate = useNavigate()
    const timerId: any = useRef();
    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();



    useEffect(() => {
        if (initialTime) {
            timerId.current = window.setInterval(() => {
                setTimeLeft((prevProgress) => prevProgress - 1);
            }, 1000);

            return () => {
                clearInterval(timerId.current);
            };
        }
    }, []);


    const handleTimeUp = () => {
        dispatch(setTimeIsUp(true));
    };

    useEffect(() => {
        if (initialTime) {
            if (progressBarPercent < 100) {
                let updateProgressPercent = Math.round(
                    ((initialTime - (timeLeft - 1)) / initialTime) * 100
                );
                setProgressBarPercent(updateProgressPercent);
            }

            if (timeLeft === 0 && timerId.current) {
                clearInterval(timerId.current);
                handleTimeUp();
                setOpenDialog(true);
                return;
            }

        }
    }, [timeLeft]);



    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",

                    marginTop: "4%",
                    width: "100%",
                    marginBottom: "-2%"
                }}
            >
                <Box sx={{ width: "85%" }}>
                    <LinearProgress
                        variant="determinate"
                        value={progressBarPercent}
                        sx={{
                            height: "50%",
                            borderRadius: "20px",
                            background: "rgba(132, 162, 233, 0.4)",
                            padding: "15px",
                            [`& .${linearProgressClasses.bar1Determinate}`]: {
                                backgroundColor: progressBarPercent > 67 ? `#f5584d` : "#304674"
                            }
                        }}
                    />
                </Box>

                <Box sx={{ ml: 1, display: "flex" }}>
                    {/* <Typography sx={{ fontWeight: 400, fontSize: "20px", marginTop: "5%" }}>
                        Time left:
                    </Typography> */}
                    <Typography className="countdown-text">
                        {moment
                            .utc(1000 * timeLeft)
                            .format(
                                `${timeLeft > 3600 ? "ss" : "ss"} `
                            )}
                    </Typography>
                </Box>

            </Box>
            {openDialog && <AlertDialogTime />}
            {/* {openDialog ? (<AlertDialog/>) :  ""} */}
        </React.Fragment>
    );
};

export default SubmitTimeProgressBar;



