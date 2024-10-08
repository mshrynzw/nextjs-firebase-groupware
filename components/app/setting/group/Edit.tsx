import { editAction } from "@/actions/app/infoAction"
import Loading from "@/app/loading"
import { GroupContext } from "@/context/app/setting/GroupContext"
import React, { useContext, useEffect, useState } from "react"
import { getAllUsers } from "@/lib/app/setting/group"
import { User } from "@/types/user"
import { formatDateTimeFromFirebase } from "@/lib/datetime"
import { AppContext } from "@/context/AppContext"
import LabelHeader from "@/components/label/LabelHeader"
import Label from "@/components/label/Label"
import InputTitle from "@/components/input/InputTitle"
import InputSelectUsers from "@/components/input/InputSelectUsers"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import ContainerCentered from "@/components/container/ContainerCentered"
import Form from "@/components/form/Form"
import TextUpdated from "@/components/text/TextUpdated"

const Edit  : React.FC= ({ editGroup }) => {
  const { setScreen } = useContext(AppContext)
  const { setGroups } = useContext(GroupContext)

  const [title, setTitle] = useState<string>(editGroup.title)
  const [users, setUsers] = useState<User[]>(editGroup.users)
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

  const formAction = async (e) => {
    const formData = new FormData(e.currentTarget)
    formData.append("title", title)
    formData.append("users", users)

    try {
      const updateGroup = await editAction(formData, editGroup.id)
      setScreen("find")
      setGroups((prevGroups) =>
        prevGroups.map(group =>
          group.id === updateGroup.id
            ? { ...group, ...updateGroup }
            : group
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <Loading/>
  if (error) return <p>{error}</p>

  return (
    <ContainerCentered>
      <LabelHeader screen="create"/>
      <Form action={formAction}>
        <Label name="title"/>
        <InputTitle value={title} onChange={(e) => setTitle(e.target.value)}/>

        <Label name="users"/>
        <InputSelectUsers data={users} setUsers={setUsers}/>

        <Label name="updated"/>
        <TextUpdated updated={formatDateTimeFromFirebase(editGroup.updatedAt)}/>

        <ButtonSubmit/>
      </Form>
    </ContainerCentered>
  )
}

export default Edit
