import { useEffect, useState } from "react"
import "./App.css"
import { addDoc, collection } from '@firebase/firestore'
import { fstore } from './firebase_handler.js'
import { getDocs } from "firebase/firestore"
import Home from "./app/components/home"
import { useAppDispatch } from "./app/hooks"
import { useSelector } from "react-redux"
import { RootState } from "@reduxjs/toolkit/query"




const App = () => {

  return (
    <>
      <Home />
    </>
  )
}

export default App
