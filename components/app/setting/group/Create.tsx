import React, { useContext, useState } from "react"
import { createdGroup, GET_USERS } from "@/lib/app/setting/group"
import { User } from "@/types/user"
import { useQuery } from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faSnowflake } from "@fortawesome/free-solid-svg-icons"
import { AppContext } from "@/context/AppContext"
import LabelHeader from "@/components/label/LabelHeader"
import ContainerCentered from "@/components/container/ContainerCentered"
import Form from "@/components/form/Form"
import Label from "@/components/label/Label"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import InputTitle from "@/components/input/InputTitle"
import InputSelectUsers from "@/components/input/InputSelectUsers"

const Create = ({ refetch }) => {
  const { setScreen } = useContext(AppContext)

  const [title, setTitle] = useState<string>("")
  const [users, setUsers] = useState<User[]>([])

  const { loading, error, data } = useQuery(GET_USERS)
  if (loading) return <p>Loading...</p>
  if (error) {
    console.error("Error fetching messages:", error)
    return <p>Error: {error.message}</p>
  }

  const handleCreat = async () => {
    try {
      await createdGroup(title, users)
      setTitle("")
      setUsers([])
      refetch()
      setScreen("find")
    } catch (error) {
      console.error(error.response.data.error.message)
    }
  }

  return (
    <ContainerCentered>
      <LabelHeader screen="create"/>
      <Form onSubmit={handleCreat}>
        <Label name="title"/>
        <InputTitle value={title} onChange={(e) => setTitle(e.target.value)}/>

        <Label name="users"/>
        <InputSelectUsers data={data} setUsers={setUsers}/>

        <ButtonSubmit/>
      </Form>
    </ContainerCentered>
  )
}

export default Create
