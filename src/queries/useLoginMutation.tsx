import { useMutation } from "react-query"
import login from "../libs/login"
import { ApiResponseErrorScheme, ApiResponseScheme, LoginCredentials, Session } from "../vite-env"
import { AxiosError } from "axios"


const useLoginMutation = () => {
  return useMutation<ApiResponseScheme<Session>, AxiosError<ApiResponseErrorScheme>, LoginCredentials>(
    login,
  )
}

export default useLoginMutation

