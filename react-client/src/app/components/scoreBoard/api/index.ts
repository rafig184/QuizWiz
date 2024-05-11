import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../../../../server/firebase";





export async function getScoreBoardService() {
    try {
        const questionsCollection = collection(firestore, "users");
        const querySnapshot = await getDocs(questionsCollection);

        const questionsData = querySnapshot.docs.map((doc) => doc.data());
        console.log(questionsData);
        const data = questionsData
        return data
    } catch (error) {
        console.log(error);
    }
}