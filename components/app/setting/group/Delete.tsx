import { GroupContext } from "@/context/app/setting/GroupContext"
import { deletedGroup } from "@/lib/app/setting/group"
import { formatDateTimeFromFirebase } from "@/lib/datetime"
import React, { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import LabelHeader from "@/components/label/LabelHeader"
import Label from "@/components/label/Label"
import ContainerCentered from "@/components/container/ContainerCentered"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import TextUpdated from "@/components/text/TextUpdated"
import Paragraph from "@/components/paragraph/Paragraph"

const Delete : React.FC = ({ deleteGroup }) => {
  const { setScreen } = useContext(AppContext)
  const { setGroups } = useContext(GroupContext)

  const handleDelete = async () => {
    await deletedGroup(deleteGroup.id)
    setScreen("find")
    setGroups((prevGroups) => prevGroups.filter(group => group.id !== deleteGroup.id))
  }

  return (
    <ContainerCentered>
      <LabelHeader screen="delete"/>
      <Label name="title"/>
      <Paragraph>{deleteGroup.title}</Paragraph>

      <Label name="users"/>
      <ul
        className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
      >
        {deleteGroup.users.data.map((user) => {
          return (
            <li key={user.id}>{user.displayName}</li>
          )
        })}
      </ul>

      <Label name="updated"/>
      <TextUpdated updated={formatDateTimeFromFirebase(deleteGroup.updatedAt)}/>

      <ButtonSubmit onClick={handleDelete}/>
    </ContainerCentered>
  )
}

export default Delete
