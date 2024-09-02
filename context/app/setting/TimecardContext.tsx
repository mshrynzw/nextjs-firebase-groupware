"use client"

import React, { createContext, useState, ReactNode } from "react"
import Timecard from "@/types/setting/timecard"

type TimecardContextType = {
  timecards : Timecard[];
  setTimecards : (timecards : Timecard[]) => void;
}

export const TimecardContext = createContext<TimecardContextType | undefined>(undefined)

export const TimecardProvider : React.FC<{ children : ReactNode }> = ({ children }) => {
  const [timecards, setTimecards] = useState<Timecard[]>([])

  return (
    <TimecardContext.Provider value={{ timecards, setTimecards }}>
      {children}
    </TimecardContext.Provider>
  )
}
