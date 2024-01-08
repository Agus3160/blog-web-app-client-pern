import { SessionContext } from "./SessionContext"
import { useContext } from "react"

const useSessionContext = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider')
  }
  return context
}

export default useSessionContext