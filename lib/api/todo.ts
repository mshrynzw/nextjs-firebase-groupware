import Cookies from "js-cookie"
import { gql } from "apollo-boost"
import { User } from "@/types/user"

export const GET_TODOS = gql`
    {
        todos(sort: "updatedAt:desc"){
            data{
                id
                attributes{
                    title
                    description
                    priority
                    check
                    due
                    createdAt
                    updatedAt
                }
            }
        }
    }
`

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

export const createdTodo = async (user : User, title : string, description : string, priority : number, check : boolean, due : string) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/todos`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        data : { user, title, description, priority, check, due }
      })
    })
  } catch (error) {
    throw error
  }
}

export const editedTodo = async (id : number, title : string, description : string, priority : number, check : boolean, due : string) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/todos/${id}`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        data : { title, description, priority, check, due }
      })
    })
  } catch (error) {
    throw error
  }
}

export const deletedTodo = async (id : number) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/todos/${id}`, {
      method : "DELETE",
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
  } catch (error) {
    throw error
  }
}
