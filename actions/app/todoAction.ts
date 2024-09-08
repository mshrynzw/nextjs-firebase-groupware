"use server"

import { createdTodo, editedTodo } from "@/lib/app/todo"

export const createAction = async (formData: FormData) => {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priority = parseInt(formData.get("priority") as unknown as string, 10)
  const due = formData.get("due") as string
  const check = (formData.get("check") as unknown as string) === 'true'

  try {
    return await createdTodo(title, description, priority, due, check)
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
