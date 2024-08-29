"use server"

import { createdInfo, editedInfo } from "@/lib/api/info"

export const createAction = async (formData : FormData, uid : string | undefined, type : string) => {
  const title = formData.get("title") as string
  const description = formData.get("description") as string

  try {
    if (uid) await createdInfo(uid, title, type, description)
  } catch (error) {
    console.error(error)
  }
}

export const editAction = async (formData : FormData, id : string) => {
  const title = formData.get("title") as string
  const description = formData.get("description") as string

  try {
    await editedInfo(id, title, description)
  } catch (error) {
    console.error(error)
  }
}
