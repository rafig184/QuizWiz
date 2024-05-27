import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
// import { firestore } from "../../../../../../server/firebase";
import { fstore } from "../../../../firebase_handler";





export async function getScoreBoardService() {
    try {
        const usersRef = collection(fstore, 'users');
        const querySnapshot = await getDocs(query(usersRef, orderBy('score', 'desc'), limit(10)));

        const usersData = querySnapshot.docs.map((doc) => doc.data());
        console.log(usersData);
        return usersData;
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
}