import { useMutation } from "react-query"
import useDeleteUser from "../hooks/useDeleteUser"
import useLogOutMutation from "./useLogOutMutation"

const useDeleteUserMutation = () => {

  const deleteUser = useDeleteUser()
  const { mutateAsync:logOut } = useLogOutMutation()

  return useMutation({
    mutationFn:deleteUser,
    onSuccess: async () => {
      await logOut()
    }
  })
}

export default useDeleteUserMutation