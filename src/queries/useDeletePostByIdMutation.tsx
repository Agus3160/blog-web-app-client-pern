import { useMutation, useQueryClient } from "react-query";
import useDeletePostById from "../hooks/useDeletePostById";

const useDeletePostByIdMutation = (id: string) => {

  const deletePostById = useDeletePostById(id)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePostById,
    onSuccess: async () => await queryClient.invalidateQueries('posts')
  })
}

export default useDeletePostByIdMutation