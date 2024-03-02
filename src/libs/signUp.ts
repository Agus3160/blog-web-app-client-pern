import { RegisterCredentials } from "../vite-env"
import { axiosPublicInstance } from "../axios/axiosBase"

const signUp = async ({ username, email, password, image, role }: RegisterCredentials) => {
  const res = await axiosPublicInstance.post('/auth/signup', {
    username: username,
    email: email,
    password: password,
    image: image,
    role: role
  })
  return res.data
}

export default signUp