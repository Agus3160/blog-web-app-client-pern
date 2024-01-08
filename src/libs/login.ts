import { LoginCredentials } from "../vite-env"
import {  axiosPrivateInstance } from "../axios/axiosBase"

const login = async ({ username, password }: LoginCredentials) => {
  const res = await axiosPrivateInstance.post('/auth/login', {
    username: username,
    password: password
  })
  return res.data
}

export default login