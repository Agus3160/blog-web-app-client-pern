import { useQuery } from "react-query"
import useGetUserData from "../../hooks/user/useGetUserData"
import { ApiResponseErrorScheme, UserData } from "../../vite-env"
import { AxiosError } from "axios"

const useGetUserDataQuery = (username:string) => {

  const getUserData = useGetUserData()

  return useQuery<UserData|undefined|null, AxiosError<ApiResponseErrorScheme>>({
    queryKey: ['user', username],
    queryFn: async () => await getUserData(username),
    retryOnMount: true,
    retry: false,
    enabled: !!username
  })

}

export default useGetUserDataQuery