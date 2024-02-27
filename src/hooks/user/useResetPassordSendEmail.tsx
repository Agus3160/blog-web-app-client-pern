import { useMutation } from "react-query"
import { axiosPublicInstance } from "../../axios/axiosBase"
import { ApiResponseScheme } from "../../vite-env"

export default function useResetPassordSendEmail() {
  return (
    useMutation({
      mutationFn: async ({email}: {email: string}) => {
        const res = await axiosPublicInstance.post<ApiResponseScheme>('/auth/reset-password-send-email', {email: email})
        return res.data
      }
    })
  )
}