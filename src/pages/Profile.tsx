import { Link, useParams } from "react-router-dom"
import useSessionContext from "../context/useSessionContext"
import { Settings, LogOut } from "lucide-react"
import useLogOutMutation from "../queries/useLogOutMutation"
import useGetPostsByUsernameQuery from "../queries/useGetPostsByUsernameQuery"
import PostList from "../components/post/PostList"

export default function Profile() {

  const { session } = useSessionContext()
  
  const { username } = useParams()

  const { mutateAsync: logOut } = useLogOutMutation()

  const {data: posts, isError} = useGetPostsByUsernameQuery(username!)

  if(isError || !posts) return <div>Error</div>

  return (
    <div className="h-full flex flex-col items-center gap-5 ">
    
    <div className=" text-white bg-slate-800 justify-between h-36 p-3 w-11/12 flex rounded-xl">
      <div className="items-center flex gap-2 overflow-hidden">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          className="w-10 h-10 rounded-full"
        ></img>
        <h2>{session?.username}</h2>
      </div>
      <div className="flex flex-col gap-2 justify-around  ">
        <button 
          onClick={async() => await logOut()}
          className="bg-red-500 p-2 rounded-md">
          <div className="flex items-center justify-center gap-2">
            <LogOut />
            Logout
          </div>
        </button>
        <Link to={`/profile/edit`} className="bg-blue-500 p-2 rounded-md">
          <div className="flex items-center justify-center gap-2"  >
            <Settings />
            Edit Profile
          </div>
        </Link>
      </div>
    </div>

    <PostList posts={posts} />

    </div>
  )
}