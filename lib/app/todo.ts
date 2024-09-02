import { db } from "@/lib/firebase"
import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "@firebase/firestore"
import Cookies from "js-cookie"

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

export const createdTodo = async (uid : string, title : string, description : string, priority : number, due : string, check : boolean) => {
  const createdAt = Timestamp.now().toDate().toISOString()
  const updatedAt = Timestamp.now().toDate().toISOString()
  const docRef = await addDoc(collection(db, "todos"), {
    uid, title,description, priority, check, due, createdAt, updatedAt
  })
  return { id : docRef.id, uid, title,description, priority, check, due, createdAt, updatedAt}
}

export const editedTodo = async (id : string, title : string, description : string, priority : number, due : string, check : boolean) => {
  const updatedAt = Timestamp.now().toDate().toISOString()
  const docRef = doc(db, "todos", id)
  await updateDoc(docRef, { title, description, priority, check, due, updatedAt })
  return { id, title, description, priority, check, due, updatedAt }
}

export const deletedTodo = async (id : string) => {
  await deleteDoc(doc(db, "todos", id))
}
