import { isAxiosError } from "axios"
import { ApiResponseErrorScheme, ApiResponseScheme } from "../vite-env"
import { ToastOptions, toast } from "react-toastify"

const toastErrorConfig:ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
}

const callErrorToast = (message?:string) => {
  toast.error(message || "Something went wrong", toastErrorConfig)
}

const toastSuccessConfig:ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
}

const callSuccessToast = (message?:string) => {
  toast.success(message || "Success", toastSuccessConfig)
}

const errorHandler = (error:unknown) => {
  if(isAxiosError<ApiResponseErrorScheme>(error) && error.response){
      const data = error.response.data
      callErrorToast(data.message)
  }
    else callErrorToast()
}

const successHandler = (data:unknown)=>{
  if(isApiResponse(data)) callSuccessToast(data.message)
}

const useStateToasterHandler = () => {
  return {
    errorHandler,
    successHandler
  }
}

export default useStateToasterHandler

function isApiResponse(value: unknown): value is ApiResponseScheme {
  
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const obj = value as ApiResponseScheme

  if (
    typeof obj.success !== 'boolean'
    || typeof obj.message !== 'string'
    || (typeof obj.data !== 'object' && typeof obj.data !== 'undefined' && obj.data !== null)
  ) {
    return false;
  }

  return true;
}