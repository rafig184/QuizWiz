import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { RootState } from "../../store";
import { useEffect, useRef, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import SubmitTimeProgressBar from "../../ui-components/progressBar";
import { AlertDialogHomeBtn, AlertDialogWin, AlertDialogWrong } from "../../ui-components/alertdialog";
import HorizontalLinearAlternativeLabelStepper from "../../ui-components/stepper";
import { addUserToDB } from "../home/api/api";
import { fetchScoreboard } from "../slices/usersSlice";
import logo from "../../../assets/horizontalLogo.png"
import FavoriteIcon from '@mui/icons-material/Favorite';
import soundtrack from '../../../assets/soundtrack.mp3'
import selectSound from '../../../assets/select.mp3'
import correctSound from '../../../assets/correct.mp3'
import wrongSound from '../../../assets/wrong.mp3'
import timesupSound from '../../../assets/timesup.mp3'
import { useGlobalAudioPlayer } from 'react-use-audio-player';



const Quiz = () => {

    const dispatch = useAppDispatch();
    const questions = useSelector((state: RootState) => state.questions.questions);
    const loggedUser = useSelector((state: RootState) => state.loggedUser.loggedUser);
    const timeIsUp = useSelector((state: RootState) => state.questions.timeIsUp);
    const [question, setQuestion] = useState([] as any)
    const [allAnswers, setAllAnswers] = useState<any[]>([]);
    const [shuffledAnswers, setShuffledAnswers] = useState<any[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [isLoading, setIsloading] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [isWrong, setIsWrong] = useState(false)
    const [isQuestionStandby, setIsQuestionStandby] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [isQuiting, setIsQuiting] = useState(false)
    const [isWinning, setIsWinning] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const [lifeSpan, setLifeSpan] = useState(3);
    const [score, setScore] = useState(0);
    const [isWrongIndex, SetIsWrongIndex] = useState([] as any);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const usedIndices = useRef<Set<number>>(new Set());
    const { load, stop } = useGlobalAudioPlayer();

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        load(soundtrack, {
            autoplay: true,
            loop: true,
            initialVolume: 0.5
        });
    }, []);


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

    const showRandomQuestion = async () => {
        load(soundtrack, {
            autoplay: true,
            loop: true,
            initialVolume: 0.5
        });
        if (usedIndices.current.size >= questions.length) {
            console.log("All questions have been shown");
            return;
        }

        let randomIndex: number;

        // Find a unique random index
        do {
            randomIndex = Math.floor(Math.random() * questions.length);
        } while (usedIndices.current.has(randomIndex));

        // Add the index to the set of used indices
        usedIndices.current.add(randomIndex);

        const randomQuestion = questions[randomIndex];
        console.log(randomIndex);
        console.log(randomQuestion);
        setQuestion(randomQuestion);

        if (randomQuestion) {
            const correctAnswer = randomQuestion.correct_answer;
            const wrongAnswers = randomQuestion.incorrect_answers;
            setCorrectAnswer(correctAnswer);
            setAllAnswers([correctAnswer, ...wrongAnswers]);
            console.log(correctAnswer);
        }
    };


    useEffect(() => {
        if (allAnswers.length > 0) {
            const shuffledAnswers = shuffleArray(allAnswers);
            setShuffledAnswers(shuffledAnswers);
            console.log(shuffledAnswers);
        }

    }, [allAnswers]);



    const replaceHTMLCharacters = (str: string) => {
        return str.replace(/&quot;|&#039;|&amp;|&lt;|&gt;|&iacute;|&aacute;/g, (match) => {
            switch (match) {
                case '&quot;':
                    return '"';
                case '&iacute;':
                    return 'i';
                case '&aacute;':
                    return 'a';
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

    useEffect(() => {
        const loggeduser = loggedUser.user.displayName
        console.log(timeIsUp);

        if (timeIsUp === true) {
            load(timesupSound, {
                autoplay: true,
                loop: false,
                initialVolume: 0.5
            });
            const user = addUserToDB({ user: loggeduser, score: score })
            console.log({ user: loggeduser, score: score });
            dispatch(fetchScoreboard())
        }
    }, [timeIsUp])




    useEffect(() => {
        if (selectedAnswer) {
            load(selectSound, {
                autoplay: true,
                loop: false,
                initialVolume: 0.5
            });
            const loggeduser = loggedUser.user.displayName
            setTimeout(async () => {
                if (selectedAnswer === correctAnswer) {
                    load(correctSound, {
                        autoplay: true,
                        loop: false,
                        initialVolume: 0.5
                    });
                    setSelectedAnswer(selectedAnswer);
                    const score = 1000
                    setScore((oldScore) => oldScore + score)
                    setIsQuestionStandby(false)
                    setIsCorrect(true)
                    setIsWrong(false);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    if (activeStep === 9 && lifeSpan === 3) {
                        setScore(12000)
                        const user = await addUserToDB({ user: loggeduser, score: 12000 })
                        console.log({ user: loggeduser, score: 12000 });
                        dispatch(fetchScoreboard())
                        setIsWinning(true)
                        stop()

                    } else if (activeStep === 9) {
                        setScore(10000)
                        const user = await addUserToDB({ user: loggeduser, score: 10000 })
                        console.log({ user: loggeduser, score: 10000 });
                        dispatch(fetchScoreboard())
                        setIsWinning(true)
                        stop()
                    } else {
                        setTimeout(() => {
                            showRandomQuestion();
                            setIsCorrect(false)
                        }, 2500);
                    }

                } else {
                    load(wrongSound, {
                        autoplay: true,
                        loop: false,
                        initialVolume: 0.5
                    });
                    const newLifeSpan = lifeSpan - 1
                    setLifeSpan(newLifeSpan)
                    setIsQuestionStandby(false)
                    setIsCorrect(false);
                    setIsWrong(true);
                    SetIsWrongIndex((prevIsWrongIndex: any) => [...prevIsWrongIndex, activeStep]);
                    if (newLifeSpan < 1) {
                        const user = await addUserToDB({ user: loggeduser, score: score })
                        console.log({ user: loggeduser, score: score });
                        dispatch(fetchScoreboard())
                        setOpenDialog(true)
                        setSelectedAnswer("");
                        stop()

                    } else {
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                        setTimeout(() => {
                            showRandomQuestion();
                            setIsWrong(false)
                        }, 2500);
                    }
                }
            }, 3000);
        }
    }, [selectedAnswer])
    console.log(isWrongIndex);



    async function selectAnswer(answer: string) {
        setSelectedAnswer(answer);
        setIsQuestionStandby(true);
        console.log(answer);
    }

    function homeButton() {
        stop()
        setIsQuiting(true)
        setTimeout(() => {
            setIsQuiting(false)
        }, 10000);
    }


    const renderLifeSpanHearts = () => {
        return (
            <>
                {Array.from({ length: lifeSpan }).map((_, index) => (
                    <FavoriteIcon fontSize="medium" key={index} style={{ color: "white", backgroundColor: "#ff6b6b", borderRadius: "50px", padding: "4%" }} />
                ))}
            </>
        );
    };
    const labels = ['A :', 'B :', 'C :', 'D :'];

    return (
        <div className="mainQuiz">
            <div className="header" >
                <img className="logoQuiz" src={logo}></img>
            </div>
            <div className="questionDiv">
                <div className="stepper" style={{ marginBottom: "4%", width: "100%", marginTop: "-6%" }}>

                    <div className="nameScoreDiv">
                        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                            <h4 className="name" >{`Player : ${loggedUser.user.displayName}`}</h4>
                            <h4 className="score">{`Score : ${score}`}</h4>
                        </div>
                        <h4 className="lifespan">Lifes:{renderLifeSpanHearts()}</h4>
                    </div>
                    <HorizontalLinearAlternativeLabelStepper key={activeStep} activeStep={activeStep} isWrongIndex={isWrongIndex} />
                </div>
                <div className="questionClass">
                    {question && Object.keys(question).length !== 0 && (
                        <h2 className="h2question">{replaceHTMLCharacters(question.question)}</h2>
                    )}
                </div>


                <div className="answerButtons">
                    {shuffledAnswers.map((answer, index) => (
                        <button
                            key={index}
                            className={`questionButton ${selectedAnswer === answer && isQuestionStandby ? 'pulse-effect' : ''}`}
                            style={{
                                backgroundColor: selectedAnswer === answer
                                    ? (isQuestionStandby
                                        ? "#d8b722"
                                        : (isCorrect
                                            ? '#20c428'
                                            : isWrong
                                                ? '#F44336'
                                                : ''))
                                    : '',
                                border:
                                    selectedAnswer === answer
                                        ? (isQuestionStandby
                                            ? "3px solid #c5a100"
                                            : (isCorrect
                                                ? '3px solid #1a9c20'
                                                : isWrong
                                                    ? '3px solid #fa2e20'
                                                    : ''))
                                        : '',

                            }}
                            onClick={() => selectAnswer(answer)}
                        >
                            {`${labels[index]} ${replaceHTMLCharacters(answer)}`}
                        </button>
                    ))}
                </div>
                {isQuestionStandby ? <div style={{ marginBottom: "10%" }}></div> : isCorrect ? (<h2 className="correctAnswer">Correct!</h2>) : isWrong ? (<h2 className="wrongAnswer">Wrong Answer!</h2>) :
                    <div className="timer" style={{ width: "100%" }}>
                        <SubmitTimeProgressBar />
                    </div>
                }
            </div>
            {isWinning && <AlertDialogWin score={score} />}
            {openDialog && <AlertDialogWrong score={score} />}
            <div className="homeBtnDiv">
                <button style={{ display: "flex", alignItems: " center" }} className="homeButton" onClick={homeButton}><HomeIcon style={{ fontSize: "xx-large", fontFamily: 'Nunito, sans-serif' }} /> Home</button>
            </div>
            {isQuiting && <AlertDialogHomeBtn />}

        </div>
    )
}

export default Quiz