import { useMutation } from "react-query"
import signUp from "../libs/signUp"
import { ApiResponseErrorScheme, ApiResponseScheme, RegisterCredentials } from "../vite-env"
import { AxiosError } from "axios"


const useSignUpMutation = () => {
  return useMutation<ApiResponseScheme<undefined>, AxiosError<ApiResponseErrorScheme>, RegisterCredentials>(
    signUp,
  )
}

export default useSignUpMutation

