import { doc, runTransaction } from "firebase/firestore";
import { db } from "../firebase";

export async function getNextLibraryId(
    prefix = "C",
    pad = 3
): Promise<string> {
    const counterRef = doc(db, "counters", "library");

    const nextNumber = await runTransaction(db, async (tx) => {
        const snap = await tx.get(counterRef);
        const current = snap.exists() ? (snap.data().next as number) : 1;
        tx.set(counterRef, { next: current + 1 }, { merge: true });
        return current;
    });

    return `${prefix}${String(nextNumber).padStart(pad, "0")}`;
}
