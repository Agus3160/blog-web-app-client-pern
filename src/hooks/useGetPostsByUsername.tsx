import useAuthAxiosInstance from "../axios/useAuthAxiosInstance"
import { ApiResponseScheme, PostRes } from "../vite-env"

const useGetPostsByUsername = (username: string|undefined) =>{

  const axiosAuth = useAuthAxiosInstance()

  return(
    async () => {
      const res = await axiosAuth.get<ApiResponseScheme<PostRes[]>>(`/posts/author/${username}`)
      return res.data.data
    }
  )
}

export default useGetPostsByUsername