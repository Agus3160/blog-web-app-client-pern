import useAuthAxiosInstance from "../../axios/useAuthAxiosInstance"
import { ApiResponseScheme, UserData } from "../../vite-env"

const useGetUserData = () => {

  const authAxios = useAuthAxiosInstance()

  return( 
    async (username:string) => {
      const res = await authAxios.get<ApiResponseScheme<UserData>>(`/user/${username}`)
      return res.data.data
    }
  )
}

export default useGetUserData