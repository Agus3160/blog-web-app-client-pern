import { useParams } from "react-router-dom"
import useGetPostByIdQuery from "../queries/useGetPostByIdQuery"

export default function PostView() {
  
  const { id } = useParams()

  console.log(id)

  const {data:postData, isLoading} = useGetPostByIdQuery(id as string)

  if(isLoading) return <div>Loading...</div>

  if(!postData) return <div>Post not found</div>
  
  return (
    <div className="w-11/12 mx-auto text-white">
      <h1 className="text-center mb-3">{postData.title}</h1>
      <hr className="my-3"></hr>
      <div dangerouslySetInnerHTML={{__html: postData.content}} />
      <p className="mt-3 text-right text-slate-400">Author: {postData.author}</p>
    </div>
  )
}