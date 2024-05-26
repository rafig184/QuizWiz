
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./app/components/home"
import Quiz from "./app/components/quiz"
import ScoreBoard from "./app/components/scoreBoard"
import { useSelector } from "react-redux"
import { RootState } from "../src/app/store";
import React, { useEffect } from "react"





const App = () => {

  const loggedUser = useSelector((state: RootState) => state.loggedUser.loggedUser);
  const [userName, setUserName] = React.useState('');


  useEffect(() => {
    if (loggedUser === true) {

      setUserName(loggedUser.user.displayName)
    }
  }, [])
  console.log(userName);




  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/scoreBoard" element={<ScoreBoard />} />
        </Routes>
      </Router>
    </>



  )
}

export default App
