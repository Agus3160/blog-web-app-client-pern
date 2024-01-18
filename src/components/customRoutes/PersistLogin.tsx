import { Outlet, Navigate, useLocation } from "react-router-dom"
import useSessionContext from "../../context/useSessionContext"
import { useEffect } from "react"
import useRefreshTokenMutation from "../../queries/useRefreshTokenMutation"
import useLocalStorage from "../../hooks/useLocalStorage"

export default function PersistLogin() {

  const {session} = useSessionContext()
  const location = useLocation()
  
  const { getValue } = useLocalStorage('persistLogin')
  const persist:boolean|null = getValue()

  const { mutateAsync:refreshToken, isLoading } = useRefreshTokenMutation()

  useEffect(() => {
    const refreshSession = async () => {
      try{
        await refreshToken()
      }catch(_err){
        console.error('Invalid credentials')
      }
    }
    if(persist && !session) refreshSession()
  }, [persist, session, refreshToken])


  return (
    <>
    {
      !persist && !session?
        <Navigate state={{from: location}} replace={true} to="/login"/>
      :
      isLoading || !session?
        <h1>Loading...</h1>
      :
        <Outlet/>
    }
    </>
  )
}