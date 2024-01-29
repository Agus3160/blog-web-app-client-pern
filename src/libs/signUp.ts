import { RegisterCredentials } from "../vite-env"
import { axiosPublicInstance } from "../axios/axiosBase"

const signUp = async ({ username, email, password, image }: RegisterCredentials) => {
  const res = await axiosPublicInstance.post('/auth/signup', {
    username: username,
    email: email,
    password: password,
    image: image
  })
  return res.data
}

export default signUp