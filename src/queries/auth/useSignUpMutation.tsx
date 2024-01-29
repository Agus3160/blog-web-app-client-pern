import { useMutation } from "react-query"
import signUp from "../../libs/signUp"
import { ApiResponseErrorScheme, ApiResponseScheme, RegisterCredentials } from "../../vite-env"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"


const useSignUpMutation = () => {

  const navigate = useNavigate()

  return useMutation<ApiResponseScheme<undefined>, AxiosError<ApiResponseErrorScheme>, RegisterCredentials>(
    signUp,
    {
      onSuccess: async () => {
        navigate('/login')
      },
    }
  )
}

export default useSignUpMutation

