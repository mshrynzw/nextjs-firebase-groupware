import { db } from "@/lib/firebase"
import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "@firebase/firestore"

export const createdSchedule = async (uid, start, end, title, textColor, backgroundColor) => {
  const createdAt = Timestamp.now().toDate().toISOString()
  const updatedAt = Timestamp.now().toDate().toISOString()

  const docRef = await addDoc(collection(db, "schedules"), {
    uid, start, end, title, textColor, backgroundColor, createdAt, updatedAt
  })
  return { id : docRef.id, uid, start, end, title, textColor, backgroundColor, createdAt, updatedAt }
}

export const editedSchedule = async (id, uid, start, end, title, textColor, backgroundColor) => {
  const updatedAt = Timestamp.now().toDate().toISOString()

  const docRef = doc(db, "schedules", id)
  await updateDoc(docRef, { uid, start, end, title, textColor, backgroundColor, updatedAt })
  return { id, uid, start, end, title, textColor, backgroundColor, updatedAt }
}

export const deletedSchedule = async (id) => {
  await deleteDoc(doc(db, "schedules", id))
}
