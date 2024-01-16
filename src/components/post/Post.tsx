import { Link } from "react-router-dom"
import { PostReq } from "../../vite-env"

type Props = {
  id: string
  title: string
  content: string
  author: string
  createdDate: string
  setPosts?: React.Dispatch<React.SetStateAction<PostReq[]>>
}

export default function Post({id, title, content, author, createdDate, setPosts}: Props) {

  const createdDateFormatted = new Date(createdDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})

  return (
    <div className="flex flex-col justify-around text-white p-2 rounded-xl bg-slate-800 h-48">
      <Link to={`/post/${id}`}><h2 className="line-clamp-1">{title}</h2></Link>
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