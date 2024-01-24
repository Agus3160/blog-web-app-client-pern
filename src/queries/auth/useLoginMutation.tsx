import { useMutation } from "react-query"
import login from "../../libs/login"
import { ApiResponseErrorScheme, ApiResponseScheme, LoginCredentials, Session } from "../../vite-env"
import { AxiosError } from "axios"
import useSessionContext from "../../context/useSessionContext"
import { useLocation, useNavigate } from "react-router-dom"

const useLoginMutation = () => {

  const {setSession} = useSessionContext()
  
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  return useMutation<ApiResponseScheme<Session>, AxiosError<ApiResponseErrorScheme>, LoginCredentials>({
    mutationFn:login,
    onSuccess: (data) => {
      const sessionData = data.data
      if(sessionData && sessionData !== undefined) {
        setSession(sessionData)
        navigate(from, {replace: true})
      }
    }
})
}

export default useLoginMutation

