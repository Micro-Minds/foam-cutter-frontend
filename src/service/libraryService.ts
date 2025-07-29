import {setDoc,getDocs, updateDoc, collection, doc, serverTimestamp} from "firebase/firestore";
import { db } from "../firebase";


export function saveNewLibraryItem(
    id: string,
    gcode: string,
    feedRate: number,
    size: number,
    stepSize: number,
    time: number
) {
    const docRef = doc(db, "library", id);
    return setDoc(docRef, {
        id,
        gcode,
        feedRate,
        size,
        stepSize,
        time,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}



export async function updateLibraryItem(
    id: string,
    gcode: string,
    feedRate: number,
    size: number,
    stepSize: number,
    time: number
) {
    const docRef = doc(db, "library", id);

    await updateDoc(docRef, {
        gcode,
        feedRate,
        size,
        stepSize,
        time,
        updatedAt: serverTimestamp(),
    });
}


export async function getAllLibraryItems() {
    const querySnapshot = await getDocs(collection(db, "library"));

    const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    console.log(items);

    return items;
}



