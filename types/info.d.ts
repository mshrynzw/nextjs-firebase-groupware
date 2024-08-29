import { Timestamp } from "firebase/firestore"

export interface Info {
  id : string;
  title : string;
  description : string;
  uid : string;
  createdAt : Timestamp;
  updatedAt : Timestamp;
}
