import { useMutation, useQueryClient } from "react-query"
import useUploadPost from "../../hooks/posts/useUploadPost"
import { useNavigate } from "react-router-dom"

const useUploadPostMutation = () => {
  
  const uploadPost = useUploadPost()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation(
    {
      mutationFn: async ({title, content, image}: {title: string, content: string, image: string|null}) => await uploadPost(title, content, image),
      onSuccess: async () => {
        await queryClient.invalidateQueries('posts')
        navigate('/')
      },
      retry: false
    }
  )
}

export default useUploadPostMutation