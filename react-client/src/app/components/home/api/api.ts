import { collection, getDocs } from "firebase/firestore";
import { fstore } from "../../../../firebase_handler";

export async function getAllQuestions() {
    try {
        const questionsCollection = collection(fstore, "generalQuestions");
        const querySnapshot = await getDocs(questionsCollection);

        const questionsData = querySnapshot.docs.map((doc) => doc.data());
        // console.log(questionsData[0].results);
        const data = questionsData[0].results
        return data
    } catch (error) {
        console.log(error);
    }
}