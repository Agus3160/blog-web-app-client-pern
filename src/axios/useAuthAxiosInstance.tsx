import { useEffect } from "react"
import useSessionContext from "../context/useSessionContext"
import { axiosPrivateInstance } from "./axiosBase"
import useRefreshTokenMutation from "../queries/useRefreshTokenMutation"
import { AxiosError } from "axios"
import { ApiResponseErrorScheme } from "../vite-env"

export default function useAuthAxiosInstance() {
  const { session } = useSessionContext()
  const { mutateAsync:refreshAccessToken } = useRefreshTokenMutation()

  useEffect(() => {
    const reqInterceptor = axiosPrivateInstance.interceptors.request.use(
      config => {
        if(!config.headers["Authorization"]){
          config.headers["Authorization"] = `Bearer ${session?.accessToken || ""}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    const resInterceptor = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error:AxiosError<ApiResponseErrorScheme>) => {
        const errorResponse = error.response
        const errorData = errorResponse?.data
        const status = errorResponse?.status
        const config = error.config

        if(!config) return Promise.reject(error)

        if(status === 403 && errorData?.name === "TokenExpiredError") { 
          const res = await refreshAccessToken()
          const newAccessToken = res?.data?.accessToken
          const newConfig = {
            ...config, 
            headers: 
              {
                ...config.headers, 
                Authorization: `Bearer ${newAccessToken || ""}`
              }
            }
          return axiosPrivateInstance(newConfig)
        }
        return Promise.reject(error)
      })
    
      return () => {
        axiosPrivateInstance.interceptors.response.eject(resInterceptor)
        axiosPrivateInstance.interceptors.request.eject(reqInterceptor) 
      }
    }
  ,[session, refreshAccessToken])
  
  return axiosPrivateInstance
}