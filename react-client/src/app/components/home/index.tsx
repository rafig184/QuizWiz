import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { RootState } from "../../store";
import { useEffect } from "react";
import { fetchQuestionsAsync } from "../slices/questionsSlice";

import { useNavigate } from "react-router-dom";




const Home = () => {

    const dispatch = useAppDispatch();
    const vacations = useSelector((state: RootState) => state.questions.genQuestions);
    const navigate = useNavigate()

    async function startQuiz() {
        try {

            navigate('/quiz')
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {

    // }, [])


    return (
        <div>

            <div className="startBtnDiv">
                <button className="homeButton" onClick={startQuiz}>Start</button>
            </div>
        </div>
    )
}

export default Home