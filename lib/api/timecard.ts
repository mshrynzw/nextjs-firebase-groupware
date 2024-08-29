import Cookies from "js-cookie"
import { gql } from "apollo-boost"

export const GET_TIMECARDS = gql`
    query GetTimecards($userId: ID!, $startDate: Date!, $endDate: Date!) {
        timecards(
            filters: {
                user: { id: { eq: $userId } },
                date: {
                    gte: $startDate,
                    lte: $endDate
                }
            },
            sort: "date:asc",
            pagination: { limit: 31 }
        ) {
            data {
                id
                attributes {
                    date
                    type {
                        data {
                            attributes {
                                title
                            }
                        }
                    }
                    startWork
                    startBreak
                    endBreak
                    endWork
                }
            }
            meta {
                pagination {
                    total
                }
            }
        }
    }
`

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

export const createTimecard = async (user, date , type, startWork, startBreak, endBreak, endWork) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/timecards`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        data : {
          user,
          date,
          type,
          startWork,
          startBreak,
          endBreak,
          endWork
        }
      })
    })
  } catch (error) {
    throw error
  }
}

export const editedTimecard = async (id, type, startWork, startBreak, endBreak, endWork) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/timecards/${id}`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        data : {
          type,
          startWork,
          startBreak,
          endBreak,
          endWork
        }
      })
    })
  } catch (error) {
    throw error
  }
}

export const deletedTimecard = async (id : number) => {
  const token = Cookies.get("token")
  try {
    await fetch(`${url}/api/timecards/${id}`, {
      method : "DELETE",
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
  } catch (error) {
    throw error
  }
}
