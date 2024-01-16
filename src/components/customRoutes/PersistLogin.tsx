import { Outlet, Navigate, useLocation } from "react-router-dom"
import useSessionContext from "../../context/useSessionContext"
import { useEffect, useState } from "react"
import useRefreshTokenMutation from "../../queries/useRefreshTokenMutation"
import useLocalStorage from "../../hooks/useLocalStorage"

export default function PersistLogin() {

  const location = useLocation()
  
  const {session, setSession} = useSessionContext()
  
  const { getValue } = useLocalStorage('persistLogin')
  const persistLogin:boolean|null = getValue()
  
  const {mutateAsync: refreshToken} = useRefreshTokenMutation()
  
  const [isRefreshing, setIsRefreshing] = useState(true)

  useEffect(() => {
    const refreshSession = async () => {
      try{
        const resData = await refreshToken()
        if(resData && resData.data) setSession(resData.data)
      }catch(_err){
        console.error('You are not allowed to visit this page')
      }
    }
    if(!session && persistLogin) refreshSession()
    setIsRefreshing(false)

  }, [setSession, refreshToken, getValue, persistLogin, location, session])

  if(isRefreshing) return <div>Loading</div>

  if(session && !isRefreshing) return <Outlet/>  

  if((!persistLogin || !session) && !isRefreshing) return <Navigate state={{from: location}} replace={true} to="/login"/>
}