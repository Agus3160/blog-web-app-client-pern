import { useMutation } from "react-query"
import { axiosPublicInstance } from "../../axios/axiosBase"
import { ApiResponseScheme } from "../../vite-env"
import { useNavigate } from "react-router-dom"

export default function useResetPasswordConfirm(token:string|undefined) {

  const navigate = useNavigate()

  return (
    useMutation({
      mutationFn: async ({password}: {password: string}) => {
        if(!token || token === undefined) throw new Error('Token not found')
        const res = await axiosPublicInstance.post<ApiResponseScheme>(`/auth/reset-password/${token}`, {password: password})
        return res.data
      },
      onSuccess: () => {
        navigate('/login', {replace: true})
      }
    })
  )
}