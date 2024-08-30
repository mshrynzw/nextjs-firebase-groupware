import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "infos"))
    const infosData = await Promise.all(
      querySnapshot.docs.map(async (d) => {
        const infoData = { id: d.id, ...d.data() } as { id: string; uid: string; [key: string]: any }
        const userDoc = await getDoc(doc(db, "users", infoData.uid))
        infoData.displayName = userDoc.exists() ? userDoc.data().displayName : "Unknown User"
        return infoData
      })
    )

    return new Response(JSON.stringify(infosData), {
      status : 200,
      headers : {
        "Content-Type" : "application/json"
      }
    })
  } catch (error) {
    console.error(error)
    // errorがError型であることを確認
    const errorMessage = (error as Error).message || "An unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}