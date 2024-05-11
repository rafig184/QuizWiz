import { collection, query, where, getDocs, addDoc, updateDoc, DocumentData } from "firebase/firestore";
import { fstore } from "../../../../firebase_handler";
import { User, signInWithPopup } from "firebase/auth";
import { auth, firestore, googleProvider } from "../../../../../../server/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";



export async function getAllGeneralQuestions() {
    try {
        const questionsCollection = collection(fstore, "generalQuestions");
        const querySnapshot = await getDocs(questionsCollection);
        // console.log(querySnapshot.docs);

        const questionsData = querySnapshot.docs.map((doc) => doc.data());
        console.log(questionsData[0].results);
        const data = questionsData[0].results
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function getAllSportQuestions() {
    try {
        const questionsCollection = collection(fstore, "sportQuestions");
        const querySnapshot = await getDocs(questionsCollection);

        const questionsData = querySnapshot.docs.map((doc) => doc.data());
        // console.log(questionsData[0].results);
        const data = questionsData[0].results
        return data
    } catch (error) {
        console.log(error);
    }
}

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
};

export const signOutWithGoogle = async () => {
    try {
        const auth = getAuth();
        const result = await signOut(auth);
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
};

interface UserData {
    user: string;
    score: number;
}

export async function addUserToDB(data: UserData) {
    const { user, score } = data;
    const usersRef = collection(firestore, 'users');
    const userQuery = query(usersRef, where('user', '==', user));

    try {
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.size > 0) {
            // User exists, update their score
            querySnapshot.forEach(async (doc) => {
                const userDocRef = doc.ref;
                const userData = doc.data() as UserData;
                console.log(userData);

                const updatedScore = userData.score + score;

                await updateDoc(userDocRef, { score: updatedScore });
            });
        } else {
            // User does not exist, add them as a new user
            await addDoc(usersRef, { user, score });
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

