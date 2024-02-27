import { axiosPrivateInstance } from "../axios/axiosBase";
import { ApiResponseScheme, Session } from "../vite-env";

const refreshAccessToken = async () => {
  const res = await axiosPrivateInstance.post<ApiResponseScheme<Session>>('/auth/refresh')
  const data = res.data.data
  return data
}

export default refreshAccessToken