import LoadingPage from "../utils/LoadingPage"
import useGetPostsQuery from "../../queries/posts/useGetPostsQuery"
import ErrorPage from "../utils/ErrorPage"
import { ArrowUpRightSquare, Pen } from "lucide-react"
import { Link } from "react-router-dom"
import useDeletePostByIdMutation from "../../queries/posts/useDeletePostByIdMutation"
import DeleteButton from "./DeleteButton"

export default function TablePosts() {

  const SIZE_ICON = 24
  const { data:posts, isLoading, error } = useGetPostsQuery()
  
  const {mutateAsync:deletePostById} = useDeletePostByIdMutation()

  if (isLoading || !posts || posts === undefined) return <LoadingPage />

  if (error) return <ErrorPage error={error} />

  if (posts.length === 0) return <h2 className="text-center text-white">There is no posts</h2>

  return (
    <div className="w-full overflow-x-auto">
      
      <table className="table-fixed min-w-full border-collapse text-white bg-slate-800 text-sm">
        <thead className="bg-slate-700 text-left">
          <tr>  
            <th className="p-2">Title</th>
            <th className=" p-2">Author</th>
            <th className=" p-2">Created Date</th>
            <th className=" p-2">Actions</th>
          </tr>
        </thead>

        <tbody>

          {(posts || []).map((post) => (
            <tr key={post.id}>
              <td className=" p-2">{post.title}</td>
              <td className=" p-2">{post.author}</td>
              <td className=" p-2">{post.createdAt}</td>
              <td className=" p-2">
                <div className="flex justify-around gap-2 sm:gap-0">
                  <Link to={`/posts/edit/${post.id}`} className="bg-yellow-500 p-1 rounded-md hover:bg-yellow-600 cursor-pointer"><Pen size={SIZE_ICON} /></Link>
                  <DeleteButton deleteFn={deletePostById} id={post.id} sizeIcon={SIZE_ICON} />
                  <Link to={`/posts/${post.id}`} target="_blank" className="bg-green-500 p-1 rounded-md hover:bg-green-600 cursor-pointer"><ArrowUpRightSquare size={SIZE_ICON} /></Link>
                </div>
              </td>
            </tr>
          ))}

        </tbody>

      </table>
      
    </div>
  )
}