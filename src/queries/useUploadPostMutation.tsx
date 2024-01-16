import { useMutation, useQueryClient } from "react-query"
import useUploadPost from "../hooks/useUploadPost"

const useUploadPostMutation = (title:string, body:string) => {
  
  const uploadPost = useUploadPost()
  const queryClient = useQueryClient()

  return useMutation(
    {
      mutationFn: async () => await uploadPost(title, body),
      onSuccess: async () => await queryClient.invalidateQueries('posts'),
      retry: false
    }
  )
}

export default useUploadPostMutation