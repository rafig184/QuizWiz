import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setTimeIsUp } from '../../components/slices/questionsSlice';
import { RootState } from '../../store';


export function AlertDialogTime() {
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false);
        navigate("/scoreBoard")
        dispatch(setTimeIsUp(false))
    };

    const timeIsUp = useSelector((state: RootState) => state.questions.timeIsUp);
    console.log(timeIsUp);

    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"You lost!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Time is up! try again next time...
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export function AlertDialogWrong(props: { score: number }) {
    const [open, setOpen] = React.useState(true);


    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false);
        navigate("/scoreBoard")
    };

    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"You lost!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This was your 3 Wrong answer! Better luck next time..
                        <br />
                        To gain score you need at least 3 right answers..
                        <br />
                        Your score is {props.score}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export function AlertDialogSignIn() {
    const [open, setOpen] = React.useState(true);


    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Plese Sign in.."}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sign in with your google account..
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export function AlertDialogHomeBtn() {
    const [open, setOpen] = React.useState(true);


    const navigate = useNavigate()
    const handleCloseHome = () => {
        setOpen(false);
        navigate("/home")
    };
    const handleClose = () => {
        setOpen(false);

    };


    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure that you want to quit?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Quiting in the middle of the game wont get you any points..
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleCloseHome} autoFocus>
                        Back Home
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export function AlertDialogWin(props: { score: number }) {
    const [open, setOpen] = React.useState(true);


    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false);
        navigate("/scoreBoard")
    };

    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"You Won!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Congratulations, you won the QuizWiz trivia!
                        <br />
                        Your knowledge and quick thinking have paid off
                        <br />
                        Your score is {props.score}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}