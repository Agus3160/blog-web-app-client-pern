import { Outlet, Navigate } from "react-router-dom"
import useSessionContext from "../context/useSessionContext"

export default function PersistLogin() {

  const {session, setSession} = useSessionContext()

  return (
    <div>PersistLogin</div>
  )
}