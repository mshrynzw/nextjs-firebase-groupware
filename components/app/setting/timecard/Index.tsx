"use client"

import React, { useContext, useState } from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { AppContext } from "@/context/AppContext"
import { motion, AnimatePresence } from "framer-motion"

const DynamicFind = dynamic(() => import("./Find"))
const DynamicContainer = dynamic(() => import("@/components/container/Container"))
const DynamicEdit = dynamic(() => import("./Edit"))
const DynamicDelete = dynamic(() => import("./Delete"))
const DynamicCreate = dynamic(() => import("./Create"))
const DynamicButtonMenu = dynamic(() => import("@/components/button/ButtonMenu"))

const Index : React.FC = () => {
  const pathName = usePathname()
  const { screen } = useContext(AppContext)

  const [editTimecardSetting, setEditTimecardSetting] = useState(null)
  const [deleteTimecardSetting, setDeleteTimecardSetting] = useState(null)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathName}
        initial={{ opacity : 0 }}
        animate={{ opacity : 1 }}
        exit={{ opacity : 0 }}
        transition={{ duration : 0.5 }}
      >
        <DynamicFind setEditTimecardSetting={setEditTimecardSetting} setDeleteTimecardSetting={setDeleteTimecardSetting}/>
        {screen !== "find" && (
          <DynamicContainer>
            {screen === "edit" && editTimecardSetting !== null ? (
              <DynamicEdit editTimecardSetting={editTimecardSetting}/>
            ) : screen === "delete" && deleteTimecardSetting !== null ? (
              <DynamicDelete deleteTimecardSetting={deleteTimecardSetting}/>
            ) : screen === "create" ? (
              <DynamicCreate/>
            ) : null}
          </DynamicContainer>
        )}
        <DynamicButtonMenu/>
      </motion.div>
    </AnimatePresence>
  )
}

export default Index