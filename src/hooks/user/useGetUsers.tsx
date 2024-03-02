import useAuthAxiosInstance from "../../axios/useAuthAxiosInstance"
import { ApiResponseScheme, Users } from "../../vite-env"

export default function useGetUsers() {
  
  const authAxios = useAuthAxiosInstance()
  
  return (
    async () => {
      const response = await authAxios.get<ApiResponseScheme<Users[]>>("/user")
      return response.data
    }
  )
}