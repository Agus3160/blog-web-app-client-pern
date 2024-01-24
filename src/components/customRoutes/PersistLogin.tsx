import { Outlet } from "react-router-dom"
import useSessionContext from "../../context/useSessionContext"
import { useEffect, useState } from "react"
import useRefreshTokenMutation from "../../queries/auth/useRefreshTokenMutation"
import useLocalStorage from "../../hooks/useLocalStorage"

export default function PersistLogin() {

  const [ refreshing, isRefreshing ] = useState(true)

  const {session} = useSessionContext()
  
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
    if(persist && !session) { 
      refreshSession()
    }
    isRefreshing(false)
  }, [persist, session, refreshToken])

  return (
    <>
    {
      isLoading || refreshing ?
        null
      :
        <Outlet/>
    }
    </>
  )
}