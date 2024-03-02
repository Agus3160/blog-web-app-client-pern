import { Navigate, Outlet } from "react-router-dom"
import useSessionContext from "../../context/useSessionContext"
import { Roles } from "../../enums"

type Props = {
  role: Roles
}

export default function ProtectedRoleRoute({role}: Props) {
  
  const { session } = useSessionContext()

  return (role === session?.role)?
    <Outlet />    
  :
    < Navigate to={'/'} replace={true} />

}