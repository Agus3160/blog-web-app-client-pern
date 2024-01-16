import { Routes, Route } from "react-router-dom"
import ProtectedRoutes from "./components/customRoutes/ProtectedRoutes"
import NavBar from "./components/NavBar"
import { QueryClientProvider, QueryClient } from 'react-query'
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import PersistLogin from "./components/customRoutes/PersistLogin"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost"
import Profile from "./pages/Profile"


function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retryDelay: 1000
      }
    }
  })

  return (
    <div className="h-screen flex flex-col " >
    <QueryClientProvider client={queryClient}>
      
      <NavBar />
      <div className="h-full w-full overflow-y-auto my-3">
      <Routes>
      
        <Route path="/">
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="login" element={<Login />}></Route>

          <Route element={<PersistLogin />}>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} ></Route>  
              <Route path="/upload" element={<CreatePost />}></Route>
              <Route path="/profile/:username" element={<Profile />}></Route>
              <Route path="/profile/edit" element={<h1>ola</h1>}></Route>
            </Route>
          </Route>
          
        </Route>

        <Route path="*" element={<NotFound />}></Route>
        
      </Routes> 
      </div>
    </QueryClientProvider>
    </div>
  )
}

export default App
