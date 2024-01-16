import { Outlet, Navigate } from "react-router-dom";
import useSessionContext from "../../context/useSessionContext";
import { useLocation } from "react-router-dom"

export default function ProtectedRoutes() {
  
  const {session} = useSessionContext()
  const location = useLocation()

  return (
    !session? 
      <Navigate state={{from: location}} replace={true} to="/login"/>
    : 
      <Outlet/>
  )
}
