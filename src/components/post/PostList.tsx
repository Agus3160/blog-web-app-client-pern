import { PostRes } from '../../vite-env'
import Post from './Post'

type Props = {
  posts?: PostRes[] | null
}

export default function PostList({posts=[]}: Props) {
  return (
    <div className="w-11/12 sm:w-1/2 flex flex-col gap-4 mx-auto">
      {(posts || []).map((post) => (
        <Post key={post.id} id={post.id} createdDate={post.createdAt} title={post.title} content={post.content} author={post.author} />
      ))}
    </div>
  )
}