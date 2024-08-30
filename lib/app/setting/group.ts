import { db } from "@/lib/firebase"
import { User } from "@/types/user"
import { addDoc, deleteDoc, doc, Timestamp, updateDoc } from "@firebase/firestore"
import { collection, getDocs } from "firebase/firestore"

export const getAllUsers = async () : Promise<User[]> => {
  const usersCollection = collection(db, "users")
  const usersSnapshot = await getDocs(usersCollection)
  return usersSnapshot.docs.map(doc => ({
    id : doc.id,
    displayName : doc.data().displayName
  }))
}

export const createdGroup = async (title, users) => {
  const createdAt = Timestamp.now().toDate().toISOString()
  const updatedAt = Timestamp.now().toDate().toISOString()

  const doc = await addDoc(collection(db, "groups"), {
    title,
    users,
    createdAt,
    updatedAt
  })
  return { id : doc.id, title, users, createdAt, updatedAt }
}

export const editedGroup = async (id : string, title : string, users : User[]) => {
  const updatedAt = Timestamp.now()
  const docRef = doc(db, "groups", id)
  await updateDoc(docRef, { title, users, updatedAt })
  return { id, title, users, updatedAt }
}

export const deletedGroup = async (id : string) => {
  await deleteDoc(doc(db, "groups", id))
}