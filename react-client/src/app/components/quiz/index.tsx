import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { fetchQuestionsAsync } from "../slices/questionsSlice";
import SkeletonTypography from "../../ui-components/skelaton";
import Variants from "../../ui-components/skelaton";





const Quiz = () => {

    const dispatch = useAppDispatch();
    const questions = useSelector((state: RootState) => state.questions.genQuestions);
    const [question, setQuestion] = useState([] as any)
    const [allAnswers, setAllAnswers] = useState<any[]>([]);
    const [shuffledAnswers, setShuffledAnswers] = useState<any[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [isLoading, setIsloading] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)


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
            dispatch(fetchQuestionsAsync())

        } catch (error) {
            console.log(error);
        } finally {
            setIsloading(false)
        }
    }, [])


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




    useEffect(() => {
        console.log(questions);
        if (questions.length !== 0) {
            showRandomQuestion();
        }

    }, [questions])


    const replaceHTMLCharacters = (str: string) => {
        return str.replace(/&quot;|&#039;/g, (match) => {
            switch (match) {
                case '&quot;':
                    return '"';
                case '&#039;':
                    return "'";
                default:
                    return match;
            }
        });
    };

    function selectAnswer(answer: string) {
        console.log(answer);
        if (answer === correctAnswer) {
            setIsCorrect(true)
            setTimeout(() => {
                showRandomQuestion();
                setIsCorrect(false)
            }, 2500);
        } else {
            return
        }

    }

    return (
        <div>

            <div className="questionDiv">
                {isLoading ? (
                    <Variants />
                ) : (
                    <div className="questionClass">
                        {question && Object.keys(question).length !== 0 && (
                            <h1>{replaceHTMLCharacters(question.question)}</h1>
                        )}
                    </div>
                )}
                <div className="answerButtons">
                    {shuffledAnswers.map((answer, index) => (
                        <button key={index} className="questionButton" onClick={() => selectAnswer(answer)}>
                            <h1>{isLoading ? (<Variants />) : answer}</h1>
                        </button>
                    ))}

                </div>

                {isCorrect ? (<h2 className="correct">Correct!</h2>) : ""}
            </div>
        </div>
    )
}

export default Quiz