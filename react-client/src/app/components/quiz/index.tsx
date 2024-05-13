import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { fetchGeneralQuestionsAsync } from "../slices/questionsSlice";
import SkeletonTypography from "../../ui-components/skelaton";
import Variants from "../../ui-components/skelaton";
import { Skeleton } from "@mui/material";
import LinearDeterminate from "../../ui-components/progressBar";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import SubmitTimeProgressBar from "../../ui-components/progressBar";
import { AlertDialogHomeBtn, AlertDialogWrong } from "../../ui-components/alertdialog";
import HorizontalLinearAlternativeLabelStepper from "../../ui-components/stepper";
import { addUserToDB } from "../home/api/api";
import { fetchScoreboard } from "../slices/usersSlice";
import logo from "../../../assets/horizontalLogo.png"




const Quiz = () => {

    const dispatch = useAppDispatch();
    const questions = useSelector((state: RootState) => state.questions.questions);
    const loggedUser = useSelector((state: RootState) => state.loggedUser.loggedUser);
    const [question, setQuestion] = useState([] as any)
    const [allAnswers, setAllAnswers] = useState<any[]>([]);
    const [shuffledAnswers, setShuffledAnswers] = useState<any[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [isLoading, setIsloading] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [isWrong, setIsWrong] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [isQuiting, setIsQuiting] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");


    const navigate = useNavigate()

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        try {
            setIsloading(true)
            console.log(questions);
            console.log(isLoading);
            if (questions.length !== 0) {
                showRandomQuestion();
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsloading(false)
            console.log(isLoading);
        }


        console.log(isLoading);
    }, [questions])


    async function showRandomQuestion() {
        const randomIndex = Math.round(Math.random() * 50)
        console.log(randomIndex)
        const randomQuestion = questions[randomIndex]

        console.log(randomQuestion);
        setQuestion(randomQuestion)
        if (randomQuestion) {
            const correctAnswer = randomQuestion.correct_answer;
            const wrongAnswers = randomQuestion.incorrect_answers;
            setCorrectAnswer(correctAnswer);
            setAllAnswers([correctAnswer, ...wrongAnswers]);
            console.log(correctAnswer);
        }



    }

    useEffect(() => {
        if (allAnswers.length > 0) {
            const shuffledAnswers = shuffleArray(allAnswers);
            setShuffledAnswers(shuffledAnswers);
            console.log(shuffledAnswers);
        }

    }, [allAnswers]);







    const replaceHTMLCharacters = (str: string) => {
        return str.replace(/&quot;|&#039;|&amp;|&lt;|&gt;/g, (match) => {
            switch (match) {
                case '&quot;':
                    return '"';
                case '&#039;':
                    return "'";
                case '&amp;':
                    return '&';
                case '&lt;':
                    return '<';
                case '&gt;':
                    return '>';
                default:
                    return match;
            }
        });
    };

    async function selectAnswer(answer: string) {

        const loggeduser = loggedUser.user.displayName
        console.log(answer);
        if (answer === correctAnswer) {
            setSelectedAnswer(answer);
            const score = 1000
            setScore((oldScore) => oldScore + score)
            setIsCorrect(true)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setTimeout(() => {
                showRandomQuestion();
                setIsCorrect(false)
            }, 2500);
        } else {
            if (activeStep < 2) {
                setScore(0)
                const finalScore = 0
                const user = await addUserToDB({ user: loggeduser, score: finalScore })
                console.log({ user: loggeduser, score: finalScore });

                dispatch(fetchScoreboard())
                setIsWrong(true)
                setOpenDialog(true)
                setSelectedAnswer("");
            } else {
                dispatch(fetchScoreboard())
                setIsWrong(true)
                setOpenDialog(true)
                setScore(0)
                setSelectedAnswer("");
                const user = await addUserToDB({ user: loggeduser, score: score })
                console.log({ user: loggeduser, score: score });
            }



        }
        if (activeStep === 9) {
            const user = await addUserToDB({ user: loggeduser, score: 10000 })
            console.log({ user: loggeduser, score: 10000 });
            dispatch(fetchScoreboard())
            alert("you win")
            navigate("/scoreBoard")
        }

    }

    function homeButton() {
        setIsQuiting(true)
        setTimeout(() => {
            setIsQuiting(false)
        }, 30000);
    }

    return (
        <div>
            <div className="header" >
                <img className="logoQuiz" src={logo}></img>
            </div>
            <div className="questionDiv">
                <div className="stepper" style={{ marginBottom: "4%", width: "100%", marginTop: "-6%" }}>

                    <div className="nameScoreDiv">
                        <h4 className="name" >{`Player : ${loggedUser.user.displayName}`}</h4>
                        <h4 className="score">{`Score : ${score}`}</h4>
                    </div>
                    <HorizontalLinearAlternativeLabelStepper activeStep={activeStep} />
                </div>
                <div className="questionClass">
                    {question && Object.keys(question).length !== 0 && (
                        <h2 className="h2question">{isLoading ? (<Skeleton variant="text" sx={{ fontSize: '1rem' }} />) : replaceHTMLCharacters(question.question)}</h2>
                    )}
                </div>

                <div className="answerButtons">
                    {shuffledAnswers.map((answer, index) => (
                        <button
                            key={index}
                            className="questionButton"
                            style={{ backgroundColor: selectedAnswer === answer ? (isCorrect ? '#5BB15C' : '') : '' }}
                            onClick={() => selectAnswer(answer)}
                        >
                            {isLoading ? (<Skeleton variant="text" sx={{ fontSize: '1rem' }} />) : replaceHTMLCharacters(answer)}
                        </button>
                    ))}
                </div>
                {isCorrect ? (<h2 className="correctAnswer">Correct!</h2>) : isWrong ? (<h2 className="wrongAnswer">Wrong Answer!</h2>) :
                    <div className="timer" style={{ width: "100%" }}>
                        <SubmitTimeProgressBar />
                    </div>
                }


            </div>
            {openDialog && <AlertDialogWrong />}
            <div className="homeBtnDiv">
                <button style={{ display: "flex", alignItems: " center" }} className="homeButton" onClick={homeButton}><HomeIcon style={{ fontSize: "xx-large" }} /> Home</button>
            </div>
            {isQuiting && <AlertDialogHomeBtn />}

        </div>
    )
}

export default Quiz