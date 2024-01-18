import useAuthAxiosInstance from "../axios/useAuthAxiosInstance"
import { ApiResponseScheme } from "../vite-env"
import { PostPutReq } from "../vite-env"

const useEditPost = (id: string) => {
  
  const axiosAuth = useAuthAxiosInstance()

  return(
    async ({title, content}: PostPutReq): Promise<ApiResponseScheme<null>> => {
      const res = await axiosAuth.put<ApiResponseScheme<null>>(`/posts/${id}`, {title, content})
      const data = res.data
      return data
    }  
  )
}

export default useEditPost