import { useMutation } from "react-query"
import useDeleteUser from "../../hooks/user/useDeleteUser"
import { useQueryClient } from "react-query"

const useDeleteUserMutation = () => {

  const queryClient = useQueryClient()
  const deleteUser = useDeleteUser()

  return useMutation({
    mutationFn:deleteUser,
    onSuccess: async () => await queryClient.invalidateQueries('users')
  })
}

export default useDeleteUserMutation