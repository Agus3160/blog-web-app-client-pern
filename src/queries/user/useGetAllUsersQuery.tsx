import { useQuery } from "react-query"
import useGetUsers from "../../hooks/user/useGetUsers"

const useGetAllUsersQuery = () => {
  const getUsers = useGetUsers()

  return useQuery(
    "users",
    async () => {
      const data = await getUsers()
      if(data.success) return data.data
      return []
    }
  )
}

export default useGetAllUsersQuery