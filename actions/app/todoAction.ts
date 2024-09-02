"use server"

import { createdTodo, editedTodo } from "@/lib/app/todo"

export const createAction = async (formData : FormData, uid : string ) => {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priority = formData.get("priority") as number
  const due = formData.get("due") as string
  const check = formData.get("check") as boolean
  
  try {
    if (uid) {
      return await createdTodo(uid, title, description, priority, due, check)
    }
  } catch (error) {
    console.error(error)
  }
}

export const editAction = async (formData : FormData, id : string) => {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priority = formData.get("priority") as number
  const due = formData.get("due") as string
  const check = formData.get("check") as boolean

  try {
    return await editedTodo(id, title, description, priority, due, check)
  } catch (error) {
    console.error(error)
  }
}
