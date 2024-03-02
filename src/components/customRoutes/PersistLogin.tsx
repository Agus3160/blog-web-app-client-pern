import { Outlet, useNavigate } from "react-router-dom"
import useSessionContext from "../../context/useSessionContext"
import { useEffect, useState } from "react"
import useRefreshTokenMutation from "../../queries/auth/useRefreshTokenMutation"
import useLocalStorage from "../../hooks/useLocalStorage"
import LoadingPage from "../../pages/utils/LoadingPage"

export default function PersistLogin() {

  const [ refreshing, isRefreshing ] = useState(true)

  const {session} = useSessionContext()

  const navigate = useNavigate()
  
  const { getValue } = useLocalStorage('persistLogin')
  const persist:boolean|null = getValue()

  const { mutateAsync:refreshToken, isLoading } = useRefreshTokenMutation()

  useEffect(() => {
    const refreshSession = async () => {
      try{
        await refreshToken()
        isRefreshing(false)
      }catch(_err){
        console.error('Invalid credentials')
        navigate('/login', {replace: true})
      }
    }
    if(persist && !session) { 
      refreshSession()
    }else{
      isRefreshing(false)
    }
  }, [persist, session, refreshToken, navigate])

  return (
    <>
    {
      isLoading || refreshing ?
        <LoadingPage/>
      :
        <Outlet/>
    }
    </>
  )
}