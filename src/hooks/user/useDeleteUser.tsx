import useAuthAxiosInstance from "../../axios/useAuthAxiosInstance"
import { ApiResponseScheme } from "../../vite-env"

const useDeleteUser = () => {

  const authAxios = useAuthAxiosInstance()

  return (
    async (id:string) => {
      const res = await authAxios.delete<ApiResponseScheme<null>>(`/user/${id}`)
      return res.data
    }
  )
}

export default useDeleteUser