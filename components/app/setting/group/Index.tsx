"use client"

import { AppContext } from "@/context/AppContext"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import React, { useContext, useState } from "react"

const DynamicFind = dynamic(() => import("@/components/app/setting/group/Find"))
const DynamicContainer = dynamic(() => import("@/components/container/Container"))
const DynamicEdit = dynamic(() => import("@/components/app/setting/group/Edit"))
const DynamicDelete = dynamic(() => import("@/components/app/setting/group/Delete"))
const DynamicCreate = dynamic(() => import("@/components/app/setting/group/Create"))
const DynamicButtonMenu = dynamic(() => import("@/components/button/ButtonMenu"))

const Index : React.FC = () => {
  const pathname = usePathname()
  const { screen } = useContext(AppContext)

  const [editGroup, setEditGroup] = useState(null)
  const [deleteGroup, setDeleteGroup] = useState(null)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity : 0 }}
        animate={{ opacity : 1 }}
        exit={{ opacity : 0 }}
        transition={{ duration : 0.5 }}
      >
        <DynamicFind setEditGroup={setEditGroup} setDeleteGroup={setDeleteGroup}/>
        {screen !== "find" && (
          <DynamicContainer>
            {screen === "edit" && editGroup !== null ? (
              <DynamicEdit editGroup={editGroup} />
            ) : screen === "delete" && deleteGroup !== null ? (
              <DynamicDelete deleteGroup={deleteGroup} />
            ) : screen === "create" ? (
              <DynamicCreate />
            ) : null}
          </DynamicContainer>
        )}
        <DynamicButtonMenu/>
      </motion.div>
    </AnimatePresence>
  )
}

export default Index