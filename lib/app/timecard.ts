import { db } from "@/lib/firebase"
import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "@firebase/firestore"

export const createdTimecard = async (uid, date, settingTimecard, startWork, startBreak, endBreak, endWork) => {
  const createdAt = Timestamp.now().toDate().toISOString()
  const updatedAt = Timestamp.now().toDate().toISOString()

  const docRef = await addDoc(collection(db, "timecards"), {
    uid, date, settingTimecard, startWork, startBreak, endBreak, endWork, createdAt, updatedAt
  })
  return { id : docRef.id, uid, date, settingTimecard, startWork, startBreak, endBreak, endWork, createdAt, updatedAt }
}

export const editedTimecard = async (id, settingTimecard, startWork, startBreak, endBreak, endWork) => {
  const updatedAt = Timestamp.now().toDate().toISOString()

  const docRef = doc(db, "timecards", id)
  await updateDoc(docRef, { settingTimecard, startWork, startBreak, endBreak, endWork, updatedAt })
  return { id, settingTimecard, startWork, startBreak, endBreak, endWork, updatedAt }
}

export const deletedTimecard = async (id) => {
  await deleteDoc(doc(db, "timecards", id))
}
