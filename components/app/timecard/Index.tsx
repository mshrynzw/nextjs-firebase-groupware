"use client"

import React, { useContext, useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { AppContext } from "@/context/AppContext"
import { AnimatePresence, motion } from "framer-motion"

const DynamicFind = dynamic(() => import("./Find"))
const DynamicContainer = dynamic(() => import("@/components/container/Container"))
const DynamicEdit = dynamic(() => import("./Edit"))
const DynamicDelete = dynamic(() => import("./Delete"))
const DynamicCreate = dynamic(() => import("./Create"))
const DynamicButtonMenu = dynamic(() => import("@/components/button/ButtonMenu"))

const Index : React.FC = () => {
  const pathname = usePathname()
  const { screen } = useContext(AppContext)

  const [editTimecard, setEditTimecard] = useState(null)
  const [deleteTimecard, setDeleteTimecard] = useState(null)
  const [createDate, setCreateDate] = useState<string>(null)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity : 0 }}
        animate={{ opacity : 1 }}
        exit={{ opacity : 0 }}
        transition={{ duration : 0.5 }}
      >
        <DynamicFind setEditTimecard={setEditTimecard} setDeleteTimecard={setDeleteTimecard} setCreateDate={setCreateDate}/>
        {screen !== "find" && (
          <DynamicContainer>
            {screen === "edit" && editTimecard !== null ? (
              <DynamicEdit editTimecard={editTimecard}/>
            ) : screen === "delete" && deleteTimecard !== null ? (
              <DynamicDelete deleteTimecard={deleteTimecard}/>
            ) : screen === "create" ? (
              <DynamicCreate createDate={createDate}/>
            ) : null}
          </DynamicContainer>
        )}
        <DynamicButtonMenu/>
      </motion.div>
    </AnimatePresence>
  )
}

export default Index