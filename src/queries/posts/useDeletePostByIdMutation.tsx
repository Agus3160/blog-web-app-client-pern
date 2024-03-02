import { useMutation, useQueryClient } from "react-query";
import useDeletePostById from "../../hooks/posts/useDeletePostById";

const useDeletePostByIdMutation = () => {

  const deletePostById = useDeletePostById()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePostById,
    onSuccess: async () => await queryClient.invalidateQueries('posts')
  })
}

export default useDeletePostByIdMutation