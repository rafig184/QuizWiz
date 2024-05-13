import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchScoreboard } from "../slices/usersSlice";
import { useEffect } from "react";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from "@mui/material";

const ScoreBoard = () => {

    const dispatch = useAppDispatch();
    const scoreBoard = useSelector((state: RootState) => state.loggedUser.scoreBoard);
    const navigate = useNavigate()



    useEffect(() => {
        getScoreBoard()
        console.log(scoreBoard);

    }, []);



    async function getScoreBoard() {
        try {
            const result = await dispatch(fetchScoreboard())
            console.log(result);
            console.log(scoreBoard);

        } catch (error) {
            console.log(error);
        }
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function homeButton() {
        navigate("/home")
    }


    return (
        <div className="tableDiv" >
            <h1 style={{ textAlign: "center", fontFamily: "Open Sans, sans-serif" }}>Score Board</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 430 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ fontWeight: "700", paddingLeft: "10%", fontFamily: "Open Sans, sans-serif" }}>User</StyledTableCell>
                            <StyledTableCell style={{ fontWeight: "700", fontFamily: "Open Sans, sans-serif" }} align="center">Score</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scoreBoard.map((row: any) => (
                            <StyledTableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell style={{ paddingLeft: "7%", fontFamily: "Open Sans, sans-serif" }} component="th" scope="row">
                                    {row.user}
                                </StyledTableCell>
                                <StyledTableCell style={{ fontFamily: "Open Sans, sans-serif" }} align="center">{row.score}</StyledTableCell>
                            </StyledTableRow >
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <div>

                </div>
                <div className="startBtnDiv">
                    <button style={{ display: "flex", alignItems: " center" }} className="homeButton" onClick={homeButton}><HomeIcon style={{ fontSize: "xx-large" }} /> Home</button>
                </div>
            </div>
        </div>
    );
}

export default ScoreBoard