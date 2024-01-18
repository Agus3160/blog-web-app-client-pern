import { useMutation, useQueryClient } from "react-query"
import useEditPost from "../hooks/useEditPost"
import { ApiResponseErrorScheme, ApiResponseScheme } from "../vite-env"
import { AxiosError } from "axios"

const useEditPostMutation = (id: string) => {
  
  const queryClient = useQueryClient()
  const editPost = useEditPost(id)

  return useMutation<ApiResponseScheme<null>, AxiosError<ApiResponseErrorScheme>, {title: string, content: string}>(
    {
      mutationFn: editPost,
      onSuccess: async () => await queryClient.invalidateQueries('posts'),
    }
  )

}

export default useEditPostMutation