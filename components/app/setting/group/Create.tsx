import Loading from "@/app/loading"
import { GroupContext } from "@/context/app/setting/GroupContext"
import React, { useContext, useEffect, useState } from "react"
import { createdGroup, getAllUsers } from "@/lib/app/setting/group"
import { User } from "@/types/user"
import { AppContext } from "@/context/AppContext"
import LabelHeader from "@/components/label/LabelHeader"
import ContainerCentered from "@/components/container/ContainerCentered"
import Form from "@/components/form/Form"
import Label from "@/components/label/Label"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import InputTitle from "@/components/input/InputTitle"
import InputSelectUsers from "@/components/input/InputSelectUsers"

const Create : React.FC = () => {
  const { setScreen } = useContext(AppContext)
  const { setGroups } = useContext(GroupContext)

  const [title, setTitle] = useState<string>("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers()
        setUsers(usersData)
      } catch (err) {
        setError("Failed to get users.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    // const formData = new FormData(e.currentTarget)
    // formData.append("title", title)
    // formData.append("users", users)

    e.preventDefault()
    try {
      const newGroup = await createdGroup(title, users)
      setGroups((prevGroups) => [...prevGroups, newGroup])
      setScreen("find")
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <Loading/>
  if (error) return <p>{error}</p>

  return (
    <ContainerCentered>
      <LabelHeader screen="create"/>
      <Form onSubmit={handleSubmit}>
        <Label name="title"/>
        <InputTitle value={title} onChange={(e) => setTitle(e.target.value)}/>

        <Label name="users"/>
        <InputSelectUsers users={users} setUsers={setUsers}/>

        <ButtonSubmit/>
      </Form>
    </ContainerCentered>
  )
}

export default Create
