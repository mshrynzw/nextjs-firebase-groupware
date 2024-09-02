"use server"

import { createdGroup, editedGroup } from "@/lib/app/setting/group"
import { User } from "@/types/user"

export const createAction = async (formData : FormData) => {
  const title = formData.get("title") as string
  const users = formData.get("users")as User[]

  try {
    return await createdGroup(title, users)
  } catch (error) {
    console.error(error)
  }
}

export const editAction = async (formData : FormData, id : string) => {
  const title = formData.get("title") as string
  const users = formData.get("users") as User[]

  try {
    return await editedGroup(id, title, users)
  } catch (error) {
    console.error(error)
  }
}
