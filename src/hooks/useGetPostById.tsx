import useAuthAxiosInstance from "../axios/useAuthAxiosInstance"
import { ApiResponseScheme, PostRes } from "../vite-env"

const useGetPostById = (id: string) => {

  const axiosAuth = useAuthAxiosInstance()

  return(
    async () => {
      const res = await axiosAuth.get<ApiResponseScheme<PostRes>>(`/posts/${id}`)
      return res.data.data
    }
  )
}

export default useGetPostById