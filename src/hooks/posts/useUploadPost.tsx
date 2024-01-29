import useAuthAxiosInstance from "../../axios/useAuthAxiosInstance"
import useSessionContext from "../../context/useSessionContext"
import { ApiResponseScheme, PostReq } from "../../vite-env"

export default function useUploadPost() {
  
  const authAxios = useAuthAxiosInstance()
  const { session } = useSessionContext()

  return (
    async (title:string, content:string, image:string) => {
      const response = await authAxios.post<ApiResponseScheme<PostReq>>("/posts/upload", {title, content, image, authorId: session?.userId})
      return response.data
    }
  )
}