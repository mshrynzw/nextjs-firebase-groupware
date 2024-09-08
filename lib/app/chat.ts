import { auth, db } from "@/lib/firebase"
import { addDoc, deleteDoc, doc, Timestamp, updateDoc, collection, getDocs } from "@firebase/firestore"

export const createdChat = async (uid, message) => {
  const createdAt = Timestamp.now().toDate().toISOString()
  const updatedAt = Timestamp.now().toDate().toISOString()

  const docRef = await addDoc(collection(db, "chats"), {
    uid, message, createdAt, updatedAt
  })
  return { id : docRef.id, uid, message, createdAt, updatedAt }
}
