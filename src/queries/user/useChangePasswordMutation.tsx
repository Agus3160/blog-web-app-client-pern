import { useMutation } from "react-query"
import useChangePassword from "../../hooks/user/useChangePassword"
import useLogOutMutation from "../auth/useLogOutMutation"

export default function useChangePasswordMutation() {

  const changePassword = useChangePassword()
  const { mutateAsync:logOut } = useLogOutMutation()

  return (
    useMutation({
      mutationFn: changePassword,
      onSuccess: async () => {
        await logOut()
      }
    })
  )
}