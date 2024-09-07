import { SettingTimecard } from "@/types/setting/timecard"

export interface Timecard {
  id : string;
  date : string;
  uid : string;
  settingTimecard : SettingTimecard;
  startWork : string;
  startBreak : string;
  endBreak : string;
  endWork : string;
  createdAt : string;
  updatedAt : string;
}
