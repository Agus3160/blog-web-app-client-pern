import React, { createContext, useState } from "react"
import { Session } from "../vite-env.d"

type SessionContextType = {
  session: Session|null
  setSession: (session: Session|null) => void
}

export const SessionContext = createContext<SessionContextType|null>(null)

const SessionProvider = ({children}: {children: React.ReactNode}) => {

  const [session, setSession] = useState<Session|null>(null)

  return (
    <SessionContext.Provider value={{session, setSession}}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider