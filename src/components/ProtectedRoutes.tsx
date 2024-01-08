import { Outlet, Navigate } from "react-router-dom";
import useSessionContext from "../context/useSessionContext";

export default function ProtectedRoutes() {
  const {session} = useSessionContext()

  console.log(session)

  return (
    !session? 
      <Navigate to="/login"/>
    : 
      <Outlet/>
  )
}
