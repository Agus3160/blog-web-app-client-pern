import { Routes, Route } from "react-router-dom"
import ProtectedRoutes from "./components/customRoutes/ProtectedRoutes"
import NavBar from "./components/NavBar"
import { QueryClientProvider, QueryClient } from 'react-query'
import SignUp from "./pages/auth/SignUp"
import Login from "./pages/auth/Login"
import PersistLogin from "./components/customRoutes/PersistLogin"
import ErrorPage from "./pages/utils/ErrorPage"
import Home from "./pages/Home"
import CreatePost from "./pages/post/CreatePost"
import Profile from "./pages/profile/Profile"
import PostView from "./pages/post/PostView"
import EditPost from "./pages/post/EditPost"
import EditProfile from "./pages/profile/EditProfile"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPasswordSendEmail from "./pages/reset-password/ResetPasswordSendEmail"
import ResetPasswordConfirm from "./pages/reset-password/ResetPasswordConfirm"

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retryOnMount: false,
        retryDelay: 1000,
      }
    }
  })

  return (
    <>
    <div className="h-svh flex flex-col overflow-y-auto" >
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" />
      <NavBar />
      <div className="flex-1 my-5">
      <Routes>
      
        <Route path="/">
          
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="reset-password/request" element={<ResetPasswordSendEmail />}></Route>
          <Route path="reset-password/:token" element={<ResetPasswordConfirm />}></Route>

          <Route element={<PersistLogin />}>
            
            <Route element={<ProtectedRoutes />}>
              
              <Route path="/" element={<Home />} ></Route>  
              <Route path="upload" element={<CreatePost />}></Route>
              
              <Route path="profile/">
                <Route path="edit" element={<EditProfile />}></Route>
                <Route path=":username" element={<Profile />}></Route>
              </Route>

              <Route path="posts/">
                <Route path=":id/" element={<PostView />}></Route>
                <Route path="edit/:id" element={<EditPost />}></Route>
              </Route>
              
            </Route>
          
            <Route path="*" element={<ErrorPage httpStatus={404} message="Page not found" />}></Route>

          </Route>
        </Route>        
      </Routes> 
      </div>
    </QueryClientProvider>
    </div>
    </>
  )
}

export default App
