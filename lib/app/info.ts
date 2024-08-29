import { db } from "@/lib/firebase"
import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "@firebase/firestore"

export const createdInfo = async (uid : string, title : string, type : string, description : string) => {
  const createdAt = Timestamp.now()
  const updatedAt = Timestamp.now()
  const doc = await addDoc(collection(db, "infos"), {
    uid, title, type, description, createdAt, updatedAt
  })
  return { id : doc.id, uid, title, type, description, createdAt, updatedAt }
}

export const editedInfo = async (id : string, title : string, description : string) => {
  const updatedAt = Timestamp.now()
  const docRef = doc(db, "infos", id)
  await updateDoc(docRef, { title, description, updatedAt })
  return { id, title, description, updatedAt }
}

export const deletedInfo = async (id : string) => {
  await deleteDoc(doc(db, "infos", id))
}
