import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    styled,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import HomeIcon from '@mui/icons-material/Home';
import { fetchScoreboard } from '../slices/usersSlice';
import logo from '../../../assets/horizontalLogo.png';
import title from '../../../assets/leaderboard1.png';
import Spinner from '../../ui-components/spinner';


const ScoreBoard = () => {
    const dispatch = useAppDispatch();
    const scoreBoard = useSelector((state: RootState) => state.loggedUser.scoreBoard);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getScoreBoard();
        console.log(scoreBoard);
    }, []);

    async function getScoreBoard() {
        try {
            setIsLoading(true);
            const result = await dispatch(fetchScoreboard());
            console.log(result);
            console.log(scoreBoard);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#f50057',
            color: theme.palette.common.white,
            fontWeight: 'bold',
            fontSize: 20,
            fontFamily: 'Nunito, sans-serif',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 18,
            fontFamily: 'Nunito, sans-serif',
            color: '#3f51b5',
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5',
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#ffffff',
        },
        '&:hover': {
            backgroundColor: '#e3f2fd',
        },
    }));

    const tableContainerStyles = {
        margin: '20px auto',
        width: '100%',

        borderRadius: '15px',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
    };


    function homeButton() {
        navigate('/home');
    }

    return (
        <div className="tableDiv">
            <div className="header" style={{ marginTop: "3%" }}>
                <img className="logoQuiz" src={logo} alt="Logo" />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "-2%" }}>
                <img className='scoreTitle' src={title} alt="title" width={300} />
            </div>
            {/* <h1 style={{ textAlign: 'center', fontFamily: 'Open Sans, sans-serif' }}>Score Board</h1> */}
            {isLoading ? (
                <Spinner />
            ) : (
                <TableContainer component={Paper} className='scoreboardTable' style={tableContainerStyles}>
                    <Table sx={{ minWidth: 430 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{ paddingLeft: '7%' }}>#</StyledTableCell>
                                <StyledTableCell style={{ paddingLeft: '10%' }}>User</StyledTableCell>
                                <StyledTableCell align="center">Score</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scoreBoard.map((row: any, index: number) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell style={{ paddingLeft: '7%' }} component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell style={{ paddingLeft: '7%' }}>{row.user}</StyledTableCell>
                                    <StyledTableCell align="center">{row.score}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <div className="startBtnDiv">
                <button onClick={homeButton} className='homeButton'>
                    <HomeIcon style={{ fontSize: 'xx-large', fontFamily: 'Nunito, sans-serif' }} />  Home
                </button>
            </div>
        </div>
    );
};

export default ScoreBoard;
