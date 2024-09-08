import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "chats"))
    const chatsData = await Promise.all(
      querySnapshot.docs.map(async (d) => {
        const chatData = { id: d.id, ...d.data() } as { id: string; uid: string; [key: string]: any }
        const userDoc = await getDoc(doc(db, "users", chatData.uid))
        chatData.displayName = userDoc.exists() ? userDoc.data().displayName : "Unknown User"
        return chatData
      })
    )

    return new Response(JSON.stringify(chatsData), {
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