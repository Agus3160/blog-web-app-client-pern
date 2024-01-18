import { Outlet, Navigate } from "react-router-dom";
import useSessionContext from "../../context/useSessionContext";
import { useLocation } from "react-router-dom"
import useLogOutMutation from "../../queries/useLogOutMutation";
import { useEffect } from "react";

export default function ProtectedRoutes() {
  
  const {session} = useSessionContext()
  const location = useLocation()

  const { mutateAsync:logOut } = useLogOutMutation()

  useEffect(() => {
    const checkSession = async () => {
      try{
        if(!session) await logOut()
      }catch(_err){
        console.error('Invalid credentials')
      }
    }
    checkSession()
  })

  return (
    !session? 
      <Navigate state={{from: location}} replace={true} to="/login"/>
    : 
      <Outlet/>
  )
}
