import { useQuery } from "react-query"
import useGetPostsByUsername from "../hooks/useGetPostsByUsername"

const useGetPostsByUsernameQuery = (username: string|undefined) => {
  
  const getPostsByUsername = useGetPostsByUsername(username)

  return useQuery(
    {
      queryKey: ['posts', username],
      queryFn: getPostsByUsername,
      enabled: !!username,
    }
  )

}

export default useGetPostsByUsernameQuery