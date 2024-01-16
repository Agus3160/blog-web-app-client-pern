import { useMutation } from "react-query"
import useSessionContext from "../context/useSessionContext"
import { useNavigate } from "react-router-dom"
import logOut from "../libs/logOut"
import useLocalStorage from "../hooks/useLocalStorage"

const useLogOutMutation = () => {
  
  const { setSession } = useSessionContext()
  const navigate = useNavigate()
  const { removeValue } = useLocalStorage('persistLogin')

  return useMutation(
    {
      mutationFn: logOut,
      onSuccess: () => {
        removeValue()
        navigate('/login', {replace: true})
        setSession(null)
      }
    }
  )
}

export default useLogOutMutation