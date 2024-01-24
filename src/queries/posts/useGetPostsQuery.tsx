import { useQuery } from "react-query"
import useGetPosts from "../../hooks/posts/useGetPosts"

const useGetPostsQuery = () => {
  const getPosts = useGetPosts()

  return useQuery(
    "posts",
    async () => {
      const data = await getPosts()
      if(data.success) return data.data
      return []
    }
  )
}

export default useGetPostsQuery