import Cookies from "js-cookie"
import { User } from "@/types/user"
import { gql } from "apollo-boost"

export const GET_GROUPS = gql`
    {
        groups {
            data {
                id
                attributes {
                    title
                    users {
                        data {
                            id
                            attributes {
                                username
                            }
                        }
                    }
                    updatedAt
                }
            }
        }
    }
`

export const GET_USERS = gql`
    {
        usersPermissionsUsers {
            data{
                id
                attributes{
                    username
                }
            }
        }
    }
`

export const GET_GROUP_BY_USER = gql`
    query GetGroupByUser($userId: ID!){
        groups(filters: { users: { id: { eq: $userId } } }, sort: "updatedAt:asc") {
            data {
                id
                attributes {
                    title
                    users {
                        data {
                            id
                        }
                    }
                }
            }
        }
    }
`

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

export const createdGroup = async (title : string, users : User[]) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/groups`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        data : { title, users }
      })
    })
  } catch (error) {
    throw error
  }
}

export const editedGroup = async (id : number, title : string, users : User[]) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/groups/${id}`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        data : { title, users }
      })
    })
  } catch (error) {
    throw error
  }
}

export const deletedGroup = async (id : number) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/groups/${id}`, {
      method : "DELETE",
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
  } catch (error) {
    throw error
  }
}
