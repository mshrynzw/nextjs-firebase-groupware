import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "timecards"))
    const timecardsData = await Promise.all(
      querySnapshot.docs.map(async (d) => {
        return { id : d.id, ...d.data() } as { id : string; uid : string; [key : string] : any }
      })
    )

    return new Response(JSON.stringify(timecardsData), {
      status : 200,
      headers : {
        "Content-Type" : "application/json"
      }
    })
  } catch (error) {
    console.error(error)
    const errorMessage = (error as Error).message || "An unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}