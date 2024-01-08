import { Routes, Route } from "react-router-dom"
import ProtectedRoutes from "./components/ProtectedRoutes"
import NavBar from "./components/NavBar"
import { QueryClientProvider, QueryClient } from 'react-query'
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"


function App() {

  const queryClient = new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Routes>
        <Route path="/">

          <Route path="signup" element={<SignUp />}></Route>
          <Route path="login" element={<Login />}></Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<div>home</div>}></Route>
          </Route>

        </Route>
      </Routes>
    </QueryClientProvider>
    </>
  )
}

export default App
