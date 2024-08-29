import Cookies from "js-cookie"
import { gql } from "apollo-boost"

export const GET_SETTING_TIMECARDS = gql`
    {
        timecardSettings(sort: "order:asc"){
            data{
                id
                attributes{
                    title
                    description
                    order
                    color
                    updatedAt
                }
            }
        }
    }
`

export const GET_ORDER = gql`
    {
        timecardSettings(sort: "order:asc") {
            data {
                id
                attributes {
                    order
                }
            }
        }
    }
`

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"
export const createTimecardSetting = async (title : string, description : string, order : number, color : string) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/timecard-settings`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        data : { title, description, order, color }
      })
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const editedTimecardSetting = async (id, title, description, order, color) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/timecard-settings/${id}`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        data : { title, description, order, color }
      })
    })
  } catch (error) {
    throw error
  }
}

export const deletedTimecardSetting = async (id : number) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/timecard-settings/${id}`, {
      method : "DELETE",
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
  } catch (error) {
    throw error
  }
}
