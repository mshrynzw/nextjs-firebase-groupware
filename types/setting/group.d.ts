import { User } from "@/types/user"

export interface SettingGroup {
  id : number;
  title : string;
  users : User[]
  createdAt : string;
  updatedAt : string;
}
