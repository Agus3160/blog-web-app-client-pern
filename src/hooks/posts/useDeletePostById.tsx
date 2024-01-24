import useAuthAxiosInstance from "../../axios/useAuthAxiosInstance"
import { ApiResponseScheme } from "../../vite-env"

const useDeletePostById = (id: string) => {
  
  const axiosAuth = useAuthAxiosInstance()

  return(
    async () => {
      const res = await axiosAuth.delete<ApiResponseScheme<null>>(`/posts/${id}`)
      return res.data
    }
  )

}
export default useDeletePostById