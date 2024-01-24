import { Link } from "react-router-dom"
import { PostReq } from "../../vite-env"
import useSessionContext from "../../context/useSessionContext"
import useDeletePostByIdMutation from "../../queries/posts/useDeletePostByIdMutation"

type Props = {
  id: string
  title: string
  content: string
  author: string
  createdDate: string
  setPosts?: React.Dispatch<React.SetStateAction<PostReq[]>>
}

export default function Post({id, title, content, author, createdDate, setPosts}: Props) {

  const { session } = useSessionContext()
  const {mutateAsync: deletePost} = useDeletePostByIdMutation(id)
  const createdDateFormatted = new Date(createdDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
  const isTheAuthor = session?.username === author

  return (
    <div className="flex flex-col justify-around text-white p-2 rounded-xl bg-slate-800 h-48">
      <div className="flex justify-between items-center   ">
        <Link to={`/posts/${id}`}><h2 className="line-clamp-1">{title}</h2></Link>
        {isTheAuthor &&
          <div className="flex items-center gap-2">
            <button onClick={async() => await deletePost()} className="bg-red-500 p-1 rounded-md" >Delete</button>
            <Link className="bg-blue-500 p-1 rounded-md" to={`/posts/edit/${id}/`} >Edit</Link>
          </div>
        }
      </div>
      <hr className="my-1"></hr>
      <div className="line-clamp-3">
        <div dangerouslySetInnerHTML={{__html: content}} />
      </div>
      <hr className="my-1"></hr>
      <div className="flex justify-between text-sm">
        <p>{author}</p>
        <span className="text-slate-400">{createdDateFormatted}</span>
      </div>
      {setPosts && <Link to={`/edit/${id}`}>Edit</Link>}
    </div>
  )
}