import { useParams } from "react-router-dom"
import useGetPostByIdQuery from "../../queries/posts/useGetPostByIdQuery"
import ErrorPage from "../utils/ErrorPage"
import LoadingImageHandler from "../../components/LoadingImageHandler"
import LoadingPage from "../utils/LoadingPage"

export default function PostView() {
  
  const { id } = useParams()

  const {data:res, isLoading, isError, error} = useGetPostByIdQuery(id as string)

  if(isLoading) return <LoadingPage />

  if(isError && error) return <ErrorPage error={error} />

  const post = res?.data

  if(!post) return null
  
  return (
    <div className="w-[300px] sm:w-[600px] mx-auto text-white">
      {post.imageUrl && <LoadingImageHandler alt="post image" src={post.imageUrl} className="w-full sm:h-72 h-40 object-cover mb-5 " />}
      <h1 className="text-center mb-3">{post.title}</h1>
      <hr className="my-3"></hr>
      <div dangerouslySetInnerHTML={{__html: post.content}} />
      <p className="mt-3 text-right text-slate-400">Author: {post.author}</p>
    </div>
  )
}