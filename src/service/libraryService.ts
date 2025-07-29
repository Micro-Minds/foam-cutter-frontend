import {setDoc,getDocs, updateDoc, deleteDoc,collection, doc, serverTimestamp} from "firebase/firestore";
import { db } from "../firebase";


export function saveNewLibraryItem(
    id: string,
    gcode: string,
    feedRate: number,
    size: number,
    stepSize: number,
    time: number,
    image:string,
    title: string,
    description: string,
) {
    const docRef = doc(db, "library", id);
    return setDoc(docRef, {
        id,
        gcode,
        feedRate,
        size,
        stepSize,
        time,
        image,
        title,
        description,
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
    time: number,
    image: string,
    title: string,
    description: string,
) {
    const docRef = doc(db, "library", id);

    await updateDoc(docRef, {
        gcode,
        feedRate,
        size,
        stepSize,
        time,
        image,
        title,
        description,
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

export async function deleteLibraryItem(itemId: string) {
    try {
        const docRef = doc(db, "library", itemId);
        await deleteDoc(docRef);
        console.log(`Document with ID ${itemId} deleted.`);
    } catch (error) {
        console.error("Error deleting document:", error);
    }
}




