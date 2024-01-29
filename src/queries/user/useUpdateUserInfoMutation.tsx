import { useMutation } from "react-query"
import useUpdateUserInfo from "../../hooks/user/useUpdateUserInfo"
import { useQueryClient } from "react-query"
import useSessionContext from "../../context/useSessionContext"
import { useNavigate } from "react-router-dom"

export default function useUpdateUserInfoMutation() {

  const { setSession } = useSessionContext()
  const updateUserInfo = useUpdateUserInfo()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: updateUserInfo,
      onSuccess: async (data) => {
        const newSession = data.data
        if(newSession) {
          setSession(newSession)
          navigate(`/profile/${newSession.username}`)
          await queryClient.invalidateQueries('user')
        }
      }
    })
  )
}