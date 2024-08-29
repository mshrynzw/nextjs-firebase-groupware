import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "@firebase/firestore"
import { db } from "@/lib/firebase"

export const createdInfo = async (uid : string, title : string, type : string, description : string) => {
  const createdAt = Timestamp.now()
  const updatedAt = Timestamp.now()
  await addDoc(collection(db, "infos"), {
    uid, title, type, description, createdAt, updatedAt
  })
}

export const editedInfo = async (id : string, title : string, description : string) => {
  const updatedAt = Timestamp.now()
  const docRef = doc(db, "infos", id)
  await updateDoc(docRef, { title, description, updatedAt })
}

export const deletedInfo = async (id : string) => {
  await deleteDoc(doc(db, "infos", id))
}
