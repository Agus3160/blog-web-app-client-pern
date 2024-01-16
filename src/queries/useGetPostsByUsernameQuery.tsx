import { useQuery } from "react-query"
import useGetPostsByUsername from "../hooks/useGetPostsByUsername"

const useGetPostsByUsernameQuery = (username: string) => {
  
  const getPostsByUsername = useGetPostsByUsername(username)

  return useQuery(
    {
      queryKey: ['posts', username],
      queryFn: getPostsByUsername
    }
  )

}

export default useGetPostsByUsernameQuery