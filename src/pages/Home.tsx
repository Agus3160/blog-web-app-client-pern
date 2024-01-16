import useGetPostsQuery from "../queries/useGetPostsQuery"
import PostList from "../components/post/PostList"

export default function Home() {
  
  const {data: posts, isLoading, isError} = useGetPostsQuery()

  if(isLoading) return <div>Loading...</div>
  if(isError || !posts) return <div>Error</div>

  return (
    <div className="w-full overflow-y-auto">
      <PostList posts={posts} />      
    </div>
  )
}