import useAuthAxiosInstance from "../../axios/useAuthAxiosInstance"
import { ApiResponseScheme, Session, UserDataPutReq } from "../../vite-env"

export default function useUpdateUserInfo() {

  const authAxios = useAuthAxiosInstance()

  return (
    async (userUpdatedData:UserDataPutReq) => {
      const res = await authAxios.put<ApiResponseScheme<Session>>("/user", userUpdatedData)
      return res.data
    }
  )
}