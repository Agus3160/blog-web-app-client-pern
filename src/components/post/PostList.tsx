import { PostRes } from '../../vite-env'
import Post from './Post'

type Props = {
  posts?: PostRes[] | null
}

export default function PostList({posts=[]}: Props) {
  return (
    <div className="w-[300px] sm:w-[600px] grid grid-cols-1 content-center sm:grid-cols-2 gap-4 mx-auto ">
      {(posts || []).map((post) => (
        <Post
          key={post.id} 
          id={post.id} 
          createdDate={post.createdAt} 
          title={post.title} 
          content={post.content} 
          author={post.author} 
          imageUrl={post.imageUrl} 
        />
      ))}
    </div>
  )
}