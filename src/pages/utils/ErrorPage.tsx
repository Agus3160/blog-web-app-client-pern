import { isAxiosError } from "axios"
import { ApiResponseErrorScheme } from "../../vite-env"

type Props = {
  httpStatus?: number
  message?: string
  error?: unknown
}

export default function ErrorPage({httpStatus, message, error}: Props) {

  let errorStatus: number | undefined
  let errorMessage: string | undefined

  if(isAxiosError<ApiResponseErrorScheme>(error) && error.response){
    const data = error.response.data
    errorStatus = error?.response?.status
    errorMessage = data.message
  }

  

  return (
    <div className="flex mx-auto h-full items-center justify-center gap-3 text-red-500 w-11/12 ">
      <img
        className="rounded-md " 
        src="/huh_cat.gif"></img>
        <div>
          <h1 className="text-5xl">{errorStatus || httpStatus}</h1>
          <p className="text-3xl">{errorMessage || message}</p>
        </div>
    </div>
  )
}