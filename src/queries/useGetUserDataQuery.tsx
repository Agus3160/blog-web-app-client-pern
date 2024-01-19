import { useQuery } from "react-query"
import useGetUserData from "../hooks/useGetUserData"

const useGetUserDataQuery = (username:string) => {

  const getUserData = useGetUserData()

  return useQuery({
    queryKey: ['user', username],
    queryFn: async () => await getUserData(username),
    retryOnMount: true,
    retry: false,
    enabled: !!username
  })

}

export default useGetUserDataQuery