import { Link, useParams } from "react-router-dom"
import useSessionContext from "../../context/useSessionContext"
import { Settings, LogOut } from "lucide-react"
import useLogOutMutation from "../../queries/auth/useLogOutMutation"
import useGetPostsByUsernameQuery from "../../queries/posts/useGetPostsByUsernameQuery"
import PostList from "../../components/post/PostList"
import useGetUserDataQuery from "../../queries/user/useGetUserDataQuery"
import { useEffect, useState } from "react"
import LoadingPage from "../utils/LoadingPage"
import ErrorPage from "../utils/ErrorPage"
import PostSkeleton from "../../components/PostSkeleton"
import Modal from "../../components/Modal"
import ImageLoadingHandler from "../../components/LoadingImageHandler"

export default function Profile() {

  const [showModal, setShowModal] = useState(false)

  const { session } = useSessionContext()
  const { username } = useParams()

  const { mutateAsync: logOut } = useLogOutMutation()

  const { data:userData , isLoading, isError, refetch, error:userDataError } = useGetUserDataQuery(username!)
  const { data: posts, isError:isPostError, error:postError, isLoading:isLoadingPosts } = useGetPostsByUsernameQuery(userData?.username)

  const isYourProfile = session?.username === username

  useEffect(() => {
    const refetchOnChange = async () => await refetch()
    refetchOnChange()
  }, [refetch, username])

  if (isLoading || isLoadingPosts) return <LoadingPage />

  if (isError && userDataError) return <ErrorPage error={userDataError} />
  if (isPostError && postError) return <ErrorPage error={postError} />

  return (
    <div className="h-full flex flex-col items-center gap-5 ">

    <Modal 
      actionButtonText="Log out" 
      setShowModal={setShowModal} 
      showModal={showModal} 
      message="Are you sure you want to log out?" 
      title="Wait!" 
      onActionFn={async () => await logOut()} 
    />
    
    <div className="text-white items-center bg-slate-800 justify-around h-36 p-3 w-[300px] sm:w-[600px] flex rounded-xl">
      <div className="items-center flex flex-col overflow-hidden">
        <ImageLoadingHandler type="avatar" sizeLoader={72} alt="profile image" src={userData?.imageUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="w-24 h-24 rounded-full object-cover" />
        <h2 className="sm:w-64 w-32 text-center truncate">{username}</h2>
        {userData?.role === "ADMIN" && <p className="text-sm">{userData?.role}</p>}
      </div>
      {
        isYourProfile &&
      <div className="flex flex-col gap-2 justify-around  ">
        
        <button 
          onClick={() => setShowModal(true)}
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
      }
    </div>

    {
      isLoadingPosts && <PostSkeleton quantity={5} />
    }
    <PostList posts={posts} />

    </div>
  )
}