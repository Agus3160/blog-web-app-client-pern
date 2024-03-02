import { Link, useLocation } from "react-router-dom"
import { PostReq } from "../../vite-env"
import useSessionContext from "../../context/useSessionContext"
import useDeletePostByIdMutation from "../../queries/posts/useDeletePostByIdMutation"
import LoadingImageHandler from "../LoadingImageHandler"
import { useState } from "react"
import Modal from "../Modal"

type Props = {
  id: string
  title: string
  content: string
  author: string
  imageUrl: string|null
  createdDate: string
  setPosts?: React.Dispatch<React.SetStateAction<PostReq[]>>
}

export default function Post({id, title, content, author, createdDate, imageUrl, setPosts}: Props) {

  const [showModal, setShowModal] = useState(false)
  const { session } = useSessionContext()
  const location = useLocation()
  const {mutateAsync: deletePost} = useDeletePostByIdMutation()
  const createdDateFormatted = new Date(createdDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
  const isTheAuthor = session?.username === author && location.pathname !== `/`

  return (
    <div className="gap-2 text-white rounded-xl bg-slate-800 ">

      <Modal 
        actionButtonText="Delete" 
        setShowModal={setShowModal} 
        showModal={showModal} 
        message="Are you sure you want to delete this post?" 
        title="Wait!" 
        onActionFn={async () => await deletePost(id)} 
      />

      <LoadingImageHandler type="image" sizeLoader={56} alt="post image" src={imageUrl || '/no-image.jpg'} className="w-full h-40 rounded-t-xl" />
      <div className="">
        <div className="flex justify-between px-2 pt-2 items-center">
          <Link to={`/posts/${id}`}><h2 className="line-clamp-1">{title}</h2></Link>
          {isTheAuthor &&
            <div className="flex gap-2">
              <button onClick={() => setShowModal(true)} className="bg-red-500 p-1 rounded-md" >Delete</button>
              <Link className="bg-blue-500 p-1 rounded-md" to={`/posts/edit/${id}/`} >Edit</Link>
            </div>
          }
        </div>
        <div className="line-clamp-3 m-2">
          <div dangerouslySetInnerHTML={{__html: content}} />
        </div>

        <div className="flex justify-between mt-auto text-sm m-2  ">
          <Link to={`/profile/${author}`}>{author}</Link>
          <span className="text-slate-400">{createdDateFormatted}</span>
        </div>
        {setPosts && <Link to={`/edit/${id}`}>Edit</Link>}
      </div>
      
    </div>
  )
}