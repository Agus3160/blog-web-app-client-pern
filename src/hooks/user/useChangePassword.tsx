import useAuthAxiosInstance from "../../axios/useAuthAxiosInstance"
import { ApiResponseScheme, ChangePasswordReq, Session } from "../../vite-env"

export default function useChangePassword() {

  const authAxios = useAuthAxiosInstance()

  return (
    async (data:ChangePasswordReq) => {
      const res = await authAxios.put<ApiResponseScheme<Session>>("/user/password", data)
      return res.data
    }
  )
}