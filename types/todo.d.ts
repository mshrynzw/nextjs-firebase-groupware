import { User } from "@/types/user"

export interface Todo {
  id : number;
  name : string;
  description : string;
  user : User;
  priority : Number;
  check : boolean;
  due : string;
  createdAt : string;
  updatedAt : string;
}
