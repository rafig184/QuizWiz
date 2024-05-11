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


const SubmitTimeProgressBar = () => {
    const initialTime = 30; // in seconds
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [progressBarPercent, setProgressBarPercent] = useState(0);
    const navigate = useNavigate()
    const timerId: any = useRef();
    const [openDialog, setOpenDialog] = useState(false);

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
                // alert("Time is up.. You lost!")
                setOpenDialog(true);
                // navigate('/home')
                // console.log(`"Dialog state set to true"==> ${openDialog}`);
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
                    marginBottom: "-4%"
                }}
            >
                <Box sx={{ width: "50%" }}>
                    <LinearProgress
                        variant="determinate"
                        value={progressBarPercent}
                        sx={{
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
                    <Typography sx={{ fontWeight: 400, fontSize: "25px" }}>
                        Time left:
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: "25px", ml: 1 }}>
                        {moment
                            .utc(1000 * timeLeft)
                            .format(
                                `${timeLeft > 3600 ? "ss[s]" : "ss[s]"} `
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



