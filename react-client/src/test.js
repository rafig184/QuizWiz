import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../server/firebase.js";


export async function getAllGeneralQuestions() {
    try {
        const questionsCollection = collection(firestore, "generalQuestions");
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

getAllGeneralQuestions()