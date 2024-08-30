"use server"

import { createdTimecard, editedTimecard } from "@/lib/app/setting/timecard"

export const createAction = async (formData : FormData) => {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const order = formData.get("order") as number
  const color = formData.get("color") as string
  try {
    return await createdTimecard(title, description, order, color)
  } catch (error) {
    console.error(error)
  }
}

export const editAction = async (formData : FormData, id : string) => {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const order = formData.get("order") as string
  const color = formData.get("color") as string

  try {
    return await editedTimecard(id, title, description, order, color)
  } catch (error) {
    console.error(error)
  }
}
