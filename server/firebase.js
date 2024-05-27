import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA86QLH7jwP6VrcV1E_dxZMSMlaRfq0JzY",
    authDomain: "quizwiz-299f7.firebaseapp.com",
    projectId: "quizwiz-299f7",
    storageBucket: "quizwiz-299f7.appspot.com",
    messagingSenderId: "984627718063",
    appId: "1:984627718063:web:f1b8eb448733b05852315a",
    measurementId: "G-R0L6CX4Z8B"
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
