import { deletedGroup } from "@/lib/app/setting/group"
import { getLocalTime } from "@/lib/datetime"
import React, { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import LabelHeader from "@/components/label/LabelHeader"
import Label from "@/components/label/Label"
import ContainerCentered from "@/components/container/ContainerCentered"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import TextUpdated from "@/components/text/TextUpdated"
import Paragraph from "@/components/paragraph/Paragraph"

const Delete = ({ deleteGroup, refetch }) => {
  const { setScreen } = useContext(AppContext)

  const handleDelete = async () => {
    await deletedGroup(deleteGroup.id)
    refetch()
    setScreen("find")
  }

  const updated = getLocalTime(deleteGroup.attributes.updatedAt)

  return (
    <ContainerCentered>
      <LabelHeader screen="delete"/>
      <Label name="title"/>
      <Paragraph>{deleteGroup.attributes.title}</Paragraph>

      <Label name="users"/>
      <ul
        className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
      >
        {deleteGroup.attributes.users.data.map((user) => {
          return (
            <li key={user.id}>{user.attributes.username}</li>
          )
        })}
      </ul>

      <Label name="updated"/>
      <TextUpdated updated={updated}/>

      <ButtonSubmit onClick={handleDelete}/>
    </ContainerCentered>
  )
}

export default Delete
