import { db } from "@/lib/firebase"
import { doc } from "@firebase/firestore"

const getUser = async (id) => {
    return doc(db, "users", id)
}

export default getUser