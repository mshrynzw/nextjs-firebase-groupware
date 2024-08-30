"use server"

import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "@firebase/firestore"
import { db } from "@/lib/firebase"

export const createdTimecard = async (title : string, description : string, order : number, color : string) => {
  const createdAt = Timestamp.now().toDate().toISOString()
  const updatedAt = Timestamp.now().toDate().toISOString()
  const docRef = await addDoc(collection(db, "settingTimecards"), {
    title, description, order, color, createdAt, updatedAt
  })
  return { id : docRef.id, title, description, order, color, createdAt, updatedAt }
}

export const editedTimecard = async (id, title, description, order, color) => {
  console.log("title", title)
  const updatedAt = Timestamp.now().toDate().toISOString()
  const docRef = doc(db, "settingTimecards", id)
  await updateDoc(docRef, { title, description, order, color, updatedAt })
  return { id, title, description, order, color, updatedAt }
}

export const deletedTimecardSetting = async (id : number) => {
  await deleteDoc(doc(db, "settingTimecards", id))
}
