
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./app/components/home"
import Quiz from "./app/components/quiz"
import logo from "../src/assets/logo.png"




const App = () => {

  return (
    <>
      <div className="header">
        <img src={logo} width={250}></img>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Router>
    </>



  )
}

export default App
