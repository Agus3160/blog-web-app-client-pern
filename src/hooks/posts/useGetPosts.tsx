import useAuthAxiosInstance from "../../axios/useAuthAxiosInstance"
import { ApiResponseScheme, PostRes } from "../../vite-env"

export default function useGetPosts() {
  
  const authAxios = useAuthAxiosInstance()
  
  return (
    async () => {
      const response = await authAxios.get<ApiResponseScheme<PostRes[]>>("/posts")
      return response.data
    }
  )
}