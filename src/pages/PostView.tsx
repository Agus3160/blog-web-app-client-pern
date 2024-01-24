import { useParams } from "react-router-dom"
import useGetPostByIdQuery from "../queries/posts/useGetPostByIdQuery"
import ErrorPage from "./ErrorPage"

export default function PostView() {
  
  const { id } = useParams()

  const {data:res, isLoading, isError, error} = useGetPostByIdQuery(id as string)

  if(isLoading) return <div>Loading...</div>

  if(isError && error) return <ErrorPage error={error} />

  const post = res?.data

  if(!post) return null
  
  return (
    <div className="w-11/12 mx-auto text-white">
      <h1 className="text-center mb-3">{post.title}</h1>
      <hr className="my-3"></hr>
      <div dangerouslySetInnerHTML={{__html: post.content}} />
      <p className="mt-3 text-right text-slate-400">Author: {post.author}</p>
    </div>
  )
}