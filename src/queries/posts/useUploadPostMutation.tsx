import { useMutation, useQueryClient } from "react-query"
import useUploadPost from "../../hooks/posts/useUploadPost"

const useUploadPostMutation = () => {
  
  const uploadPost = useUploadPost()
  const queryClient = useQueryClient()

  return useMutation(
    {
      mutationFn: async ({title, content}: {title: string, content: string}) => await uploadPost(title, content),
      onSuccess: async () => await queryClient.invalidateQueries('posts'),
      retry: false
    }
  )
}

export default useUploadPostMutation