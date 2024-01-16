import { axiosPrivateInstance } from "../axios/axiosBase";
import { ApiResponseScheme } from "../vite-env";

const logOut = async () => {
  const res = await axiosPrivateInstance.post<ApiResponseScheme<undefined>>('/auth/logout')
  return res
}

export default logOut