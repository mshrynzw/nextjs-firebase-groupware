import { User } from "@/types/user"

export interface TimecardSetting {
  id : number;
  attributes : {
    name : string;
    description : string;
    order : number;
    color : string;
    createdAt : string;
    updatedAt : string;
  }
}
