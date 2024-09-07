"use client"

import React, { createContext, useState, ReactNode } from "react"
import timecard from "@/types/timecard"

type TimecardContextType = {
  timecards : timecard[];
  setTimecards : (timecards : timecard[]) => void;
}

export const TimecardContext = createContext<TimecardContextType | undefined>(undefined)

export const TimecardProvider : React.FC<{ children : ReactNode }> = ({ children }) => {
  const [timecards, setTimecards] = useState<timecard[]>([])

  return (
    <TimecardContext.Provider value={{ timecards, setTimecards }}>
      {children}
    </TimecardContext.Provider>
  )
}
