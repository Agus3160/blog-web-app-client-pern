import LoadingPage from "../utils/LoadingPage"
import useGetAllUsersQuery from "../../queries/user/useGetAllUsersQuery"
import ErrorPage from "../utils/ErrorPage"
import { ArrowUpRightSquare } from "lucide-react"
import { Link } from "react-router-dom"
import ImageLoadingHandler from "../../components/LoadingImageHandler"
import useLogOutMutation from "../../queries/auth/useLogOutMutation"
import useSessionContext from "../../context/useSessionContext"
import useDeleteUserMutation from "../../queries/user/useDeleteUserMutation"
import DeleteButton from "./DeleteButton"

export default function TableUsers() {

  const SIZE_ICON = 24

  const { session } = useSessionContext()

  const { mutateAsync:logOut } = useLogOutMutation()

  const { data:users, isLoading, error } = useGetAllUsersQuery()
  const { mutateAsync:deleteUserById } = useDeleteUserMutation()
  const handleDelete = async (id:string) => {
    const res = await deleteUserById(id)
    if(session && session.userId === id) await logOut()
    return res
  }

  if (isLoading || !users || users === undefined) return <LoadingPage />

  if (error) return <ErrorPage error={error} />

  if (users.length === 0) return <h2 className="text-center text-white">There is no posts</h2>

  return (
    <div className="w-full overflow-x-auto">
      
      <table className="table-auto min-w-full border-collapse text-white bg-slate-800 text-sm">
        <thead className="bg-slate-700 text-left">
          <tr>  
            <th className="w-24 p-2">Image</th>
            <th className="w-1/2 p-2">Username</th>
            <th className=" p-2">Rol</th>
            <th className=" p-2">Actions</th>
          </tr>
        </thead>

        <tbody>

          {(users || []).map((user) => (
            <tr key={user.id}>
              <td className="p-2">
                <ImageLoadingHandler sizeLoader={SIZE_ICON} className="m-auto w-12 h-12 rounded-full object-cover" type="avatar" src={user.imageUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt={user.username} />
              </td>
              <td className=" p-2">{user.username}</td>
              <td className=" p-2">{user.role}</td>
              <td className=" p-2">
                <div className="flex gap-2 sm:gap-4">
                  <DeleteButton deleteFn={handleDelete} id={user.id} sizeIcon={SIZE_ICON} />
                  <Link to={`/profile/${user.username}`} className="bg-green-500 p-1 rounded-md hover:bg-green-600 cursor-pointer" target="_blank"><ArrowUpRightSquare size={SIZE_ICON} /></Link>
                </div>
              </td>
            </tr>
          ))}

        </tbody>

      </table>
      
    </div>
  )
}