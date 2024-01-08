import { axiosPrivateInstance } from "../axios/axiosBase";

const refreshAccessToken = async () => {
  const res = await axiosPrivateInstance.get('/auth/refresh')
  return res.data
}

export default refreshAccessToken