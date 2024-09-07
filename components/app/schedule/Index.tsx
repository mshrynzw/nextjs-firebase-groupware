"use client"

import { AppContext } from "@/context/AppContext"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import React, { useContext, useState } from "react"

const DynamicFind = dynamic(() => import("./Find"))
const DynamicEdit = dynamic(() => import("./Edit"))
const DynamicDelete = dynamic(() => import("./Delete"))
const DynamicCreate = dynamic(() => import("./Create"))

const Index : React.FC = () => {
  const pathname = usePathname()
  const { screen } = useContext(AppContext)

  const [createSchedule, setCreateSchedule] = useState(null)
  const [editSchedule, setEditSchedule] = useState(null)
  const [deleteSchedule, setDeleteSchedule] = useState(null)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity : 0 }}
        animate={{ opacity : 1 }}
        exit={{ opacity : 0 }}
        transition={{ duration : 0.5 }}
      >
        <div className="flex flex-row">
          <div className={`relative block min-w-0 w-full overflow-x-auto break-words rounded-lg bg-white p-4 shadow-lg ${screen !== "find" ? "mr-64" : null}`}>
            <DynamicFind setCreateSchedule={setCreateSchedule} setEditSchedule={setEditSchedule} setDeleteSchedule={setDeleteSchedule}/>
          </div>

          {screen === "editDelete" && editSchedule !== null ? (
            <div className="absolute inset-y-0 right-0 w-64 bg-white px-6 py-4 shadow-xl">
              <div className="space-y-24">
                <DynamicEdit editSchedule={editSchedule}/>
                <DynamicDelete deleteSchedule={deleteSchedule}/>
              </div>
            </div>
          ) : screen === "create" ? (
            <div className="absolute inset-y-0 right-0 w-64 bg-white px-6 py-4 shadow-xl">
              <DynamicCreate createSchedule={createSchedule}/>
            </div>
          ) : null}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Index