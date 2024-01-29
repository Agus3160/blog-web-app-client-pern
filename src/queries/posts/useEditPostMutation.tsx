import { useMutation, useQueryClient } from "react-query"
import useEditPost from "../../hooks/posts/useEditPost"
import { ApiResponseErrorScheme, ApiResponseScheme } from "../../vite-env"
import { AxiosError } from "axios"
import { PostPutReq } from "../../vite-env"

const useEditPostMutation = (id: string) => {
  
  const queryClient = useQueryClient()
  const editPost = useEditPost(id)

  return useMutation<ApiResponseScheme<null>, AxiosError<ApiResponseErrorScheme>, PostPutReq>(
    {
      mutationFn: editPost,
      onSuccess: async () => await queryClient.invalidateQueries(['post', id]),
      retry: false
    }
  )

}

export default useEditPostMutation