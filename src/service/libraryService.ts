import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export function saveNewLibraryItem(
    id: string,
    gcode: string,
    feedRate: number,
    size: number,
    stepSize: number,
    time: number
){
    const docRef =  addDoc(collection(db, "library"), {
        id,
        gcode,
        feedRate,
        size,
        stepSize,
        time,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef;

}
