import { User } from "@/types/user"

export interface Group {
  id : number;
  title : string;
  users : User[]
  createdAt : string;
  updatedAt : string;
}
