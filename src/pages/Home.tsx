import useGetPostsQuery from "../queries/posts/useGetPostsQuery"
import PostList from "../components/post/PostList"
import PostSkeleton from "../components/PostSkeleton"

export default function Home() {
  
  const {data: posts, isLoading} = useGetPostsQuery()

  if(isLoading) return <PostSkeleton quantity={4} />

  return (
    <PostList posts={posts} />      
  )

}