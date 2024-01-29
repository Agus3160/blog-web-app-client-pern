import useAuthAxiosInstance from "../../axios/useAuthAxiosInstance"
import { ApiResponseScheme } from "../../vite-env"
import { PostPutReq } from "../../vite-env"

const useEditPost = (id: string) => {
  
  const axiosAuth = useAuthAxiosInstance()

  return(
    async ({title, content, newImage, oldImageUrl}: PostPutReq): Promise<ApiResponseScheme<null>> => {
      const res = await axiosAuth.put<ApiResponseScheme<null>>(`/posts/${id}`, {title, content, newImage, oldImageUrl})
      return res.data
    }  
  )
}

export default useEditPost