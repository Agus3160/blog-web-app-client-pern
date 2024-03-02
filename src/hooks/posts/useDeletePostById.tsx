import useAuthAxiosInstance from "../../axios/useAuthAxiosInstance"
import { ApiResponseScheme } from "../../vite-env"

const useDeletePostById = () => {
  
  const axiosAuth = useAuthAxiosInstance()

  return(
    async (id:string) => {
      const res = await axiosAuth.delete<ApiResponseScheme<null>>(`/posts/${id}`)
      return res.data
    }
  )

}
export default useDeletePostById