import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { RootState } from "../../store";
import { useEffect } from "react";
import { fetchQuestionsAsync } from "../pages/questionsSlice";




const Home = () => {

    const dispatch = useAppDispatch();
    const vacations = useSelector((state: RootState) => state.questions.genQuestions);

    useEffect(() => {
        try {
            dispatch(fetchQuestionsAsync())
        } catch (error) {
            console.log(error);

        }
    }, [])


    return (
        <div>
            <h1>QuizWiz</h1>
            <button className="homeButton">Start</button>
        </div>
    )
}

export default Home