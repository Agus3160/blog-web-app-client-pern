import { useMutation } from "react-query"
import useDeleteUser from "../../hooks/user/useDeleteUser"
import useLogOutMutation from "../auth/useLogOutMutation"

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