import { NextRequest } from "next/server"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function GET(request : NextRequest) {
  const { searchParams } = new URL(request.url)
  const uid = searchParams.get("uid")

  if (!uid) {
    return new Response(JSON.stringify({ error : "Missing uid parameter" }), {
      status : 400,
      headers : {
        "Content-Type" : "application/json"
      }
    })
  }

  try {
    const groupsCollection = collection(db, "groups")
    const q = query(groupsCollection, where("users.id", "array-contains", uid))
    const querySnapshot = await getDocs(q)
    const groupsData = querySnapshot.docs.map(d => ({
      id : d.id,
      ...d.data()
    }))

    return new Response(JSON.stringify(groupsData), {
      status : 200,
      headers : {
        "Content-Type" : "application/json"
      }
    })
  } catch (error) {
    console.error(error)
    const errorMessage = (error as Error).message || "An unknown error occurred"
    return new Response(JSON.stringify({ error : errorMessage }), {
      status : 500,
      headers : {
        "Content-Type" : "application/json"
      }
    })
  }
}