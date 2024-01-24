import { useQuery } from "react-query";
import useGetPostById from "../../hooks/posts/useGetPostById";
import { AxiosError } from "axios";
import { ApiResponseErrorScheme, ApiResponseScheme, PostRes } from "../../vite-env";

const useGetPostByIdQuery = (id: string) => {

  const getPostById = useGetPostById(id)

  return useQuery<ApiResponseScheme<PostRes>, AxiosError<ApiResponseErrorScheme>>({
    queryKey: ['post', id], 
    queryFn: getPostById,
    retry: false
  }
  )
}

export default useGetPostByIdQuery