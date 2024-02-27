  import { useMutation } from "react-query"
  import useSessionContext from "../../context/useSessionContext"
  import { ApiResponseErrorScheme } from "../../vite-env"
  import { AxiosError } from "axios"
  import useLogOutQuery from "./useLogOutMutation"
  import refreshAccessToken from "../../libs/refreshAccessToken"
  import useStateToasterHandler from "../../hooks/useStateToasterHandler"

  const useRefreshTokenMutation = () => {

    const { setSession } = useSessionContext()
    const { mutateAsync:logOut } = useLogOutQuery()
    const { errorHandler } = useStateToasterHandler()

    return useMutation(
      {
        mutationFn: refreshAccessToken,
        onSuccess: async (data) => {
          if(!data || !data.accessToken) return
          const newSession = {
            username: data.username,
            userId: data.userId,
            profileImage: data.profileImage,
            accessToken: data.accessToken
          }
          setSession(newSession)
        },
        onError: async (error: AxiosError<ApiResponseErrorScheme>) => {
          if (error.response?.status === 401){
            errorHandler(error)
            await logOut()
          }
        },
        retry: false
      }
    )
  }

  export default useRefreshTokenMutation
