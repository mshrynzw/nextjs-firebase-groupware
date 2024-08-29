import Cookies from "js-cookie"
import { gql } from "apollo-boost"
import { User } from "@/types/user"

export const GET_SCHEDULES = gql`
    {
        schedules{
            data{
                id
                attributes{
                    start
                    end
                    title
                    textColor
                    backgroundColor
                }
            }
        }
    }
`

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

export const createdSchedule = async (user : User, start : Date, end : Date, title : string, textColor : string, backgroundColor : string) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/schedules`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        data : { user, start, end, title, textColor, backgroundColor }
      })
    })
  } catch (error) {
    throw error
  }
}

export const editedSchedule = async (id : number, start : Date, end : Date, title : string, textColor : string, backgroundColor : string) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/schedules/${id}`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        data : { start, end, title, textColor, backgroundColor }
      })
    })
  } catch (error) {
    throw error
  }
}

export const deletedSchedule = async (id : number) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/schedules/${id}`, {
      method : "DELETE",
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
  } catch (error) {
    throw error
  }
}
