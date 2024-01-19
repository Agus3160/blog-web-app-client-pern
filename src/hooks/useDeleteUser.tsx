import useAuthAxiosInstance from "../axios/useAuthAxiosInstance"
import { ApiResponseScheme } from "../vite-env"

const useDeleteUser = () => {

  const authAxios = useAuthAxiosInstance()

  return (
    async () => {
      const res = await authAxios.delete<ApiResponseScheme<null>>('/user')
      return res.data
    }
  )
}

export default useDeleteUser