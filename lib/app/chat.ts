import { User } from "@/types/user"
import { gql } from "@apollo/client"
import Cookies from "js-cookie"

export const wwsUrl = process.env.NEXT_PUBLIC_WSS_URL|| "http://localhost:1338"

export const GET_CHATS = gql`
  {
    chats(sort: "createdAt:asc", pagination: { limit:50 }) {
      data {
        id
        attributes {
          text
          createdAt
          user {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

export const createdChat =async (user: User, text: string)=>{
  const token = Cookies.get("token")
  try {
    return await fetch(`${url}/api/chats`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        data : { user, text }
      })
    })
  } catch (error) {
    throw error
  }
}