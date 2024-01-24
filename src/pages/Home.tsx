import useGetPostsQuery from "../queries/posts/useGetPostsQuery"
import PostList from "../components/post/PostList"
import PostSkeleton from "../components/PostSkeleton"

export default function Home() {
  
  const {data: posts, isLoading} = useGetPostsQuery()

  if(isLoading) return (
    <div className="w-11/12 sm:w-1/2 flex flex-col gap-4 mx-auto">
      <PostSkeleton quantity={5} />
    </div>
  )

  if (!posts) return null

  return (
    <PostList posts={posts} />      
  )

}