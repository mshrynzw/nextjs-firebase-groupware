"use client"

import React, { createContext, useState, ReactNode } from "react"
import schedule from "@/types/schedule"

type ScheduleContextType = {
  schedules : schedule[];
  setSchedules : (schedules : schedule[]) => void;
}

export const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined)

export const ScheduleProvider : React.FC<{ children : ReactNode }> = ({ children }) => {
  const [schedules, setSchedules] = useState<schedule[]>([])

  return (
    <ScheduleContext.Provider value={{ schedules, setSchedules }}>
      {children}
    </ScheduleContext.Provider>
  )
}
