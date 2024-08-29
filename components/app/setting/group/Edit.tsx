import React, { useContext, useState } from "react"
import { editedGroup, GET_USERS } from "@/lib/app/setting/group"
import { User } from "@/types/user"
import { useQuery } from "@apollo/client"
import { getLocalTime } from "@/lib/datetime"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSnowflake } from "@fortawesome/free-solid-svg-icons"
import { AppContext } from "@/context/AppContext"
import LabelHeader from "@/components/label/LabelHeader"
import Label from "@/components/label/Label"
import InputTitle from "@/components/input/InputTitle"
import InputSelectUsers from "@/components/input/InputSelectUsers"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import ContainerCentered from "@/components/container/ContainerCentered"
import Form from "@/components/form/Form"
import TextUpdated from "@/components/text/TextUpdated"

const Edit = ({ editGroup, refetch }) => {
  const { setScreen } = useContext(AppContext)

  const [title, setTitle] = useState<string>(editGroup.attributes.title)
  const [users, setUsers] = useState<User[]>(editGroup.attributes.users.data)

  const { loading, error, data } = useQuery(GET_USERS)
  if (loading) return <p>Loading...</p>
  if (error) {
    console.error("Error fetching messages:", error)
    return <p>Error: {error.message}</p>
  }

  const handleEdit = async () => {
    await editedGroup(editGroup.id, title, users)
    refetch()
    setScreen("find")
  }

  const updated = getLocalTime(editGroup.attributes.updatedAt)

  return (
    <ContainerCentered>
      <LabelHeader screen="create"/>
      <Form onSubmit={handleEdit}>
        <Label name="title"/>
        <InputTitle value={title} onChange={(e) => setTitle(e.target.value)}/>

        <Label name="users"/>
        <InputSelectUsers data={data} setUsers={setUsers}/>

        <Label name="updated"/>
        <TextUpdated updated={updated}/>

        <ButtonSubmit/>
      </Form>
    </ContainerCentered>
  )
}

export default Edit
