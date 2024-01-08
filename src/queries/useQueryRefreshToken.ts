import { useQuery } from "react-query"
import { ApiResponseErrorScheme, ApiResponseScheme, LoginCredentials, Session } from "../vite-env"
import { AxiosError } from "axios"
import refreshAccessToken from "../pages/refreshAccessToken"


const useQueryRefreshAccessToken = () => {
  return useQuery<ApiResponseScheme<Session>, AxiosError<ApiResponseErrorScheme>, LoginCredentials>(
    'refreshAccessToken',
    refreshAccessToken,
  )
}

export default useQueryRefreshAccessToken
