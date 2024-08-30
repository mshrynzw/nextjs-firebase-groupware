import { User } from "@/types/user"
import { Timecard } from "@/types/setting/timecard"

export interface Timecard {
  id : number;
  date : string;
  type : Timecard;
  startWork : string;
  startBreak : string;
  endBreak : string;
  endWork : string;
  user : User;
  createdAt : string;
  updatedAt : string;
}
