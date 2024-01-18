import { useQuery } from "react-query";
import useGetPostById from "../hooks/useGetPostById";
import { AxiosError } from "axios";
import { ApiResponseErrorScheme, PostRes } from "../vite-env";

const useGetPostByIdQuery = (id: string) => {

  const getPostById = useGetPostById(id)

  return useQuery<PostRes|undefined, AxiosError<ApiResponseErrorScheme>>({
    queryKey: ['post', id], 
    queryFn: getPostById,
    retry: false
  }
  )
}

export default useGetPostByIdQuery