import { Trash, Loader2 } from "lucide-react"
import { useState } from "react"
import { ApiResponseScheme } from "../../vite-env"
import useStateToasterHandler from "../../hooks/useStateToasterHandler"

type Props = {
  deleteFn: (id:string) => Promise<ApiResponseScheme<null>>
  id: string
  sizeIcon?: number
}

export default function DeleteButton({ deleteFn: deleteFn, sizeIcon = 24, id }: Props) {

  const [isDeleting, setIsDeleting] = useState(false)
  const { errorHandler, successHandler} = useStateToasterHandler()

  const handleDelete = async (id:string) => {
    setIsDeleting(true)
    try{
      const res =await deleteFn(id)
      successHandler(res.data)
    }catch(err){
      errorHandler(err)
    }finally{
      setIsDeleting(false)
    }
  }

  return (
    <button className="bg-red-500 p-1 rounded-md hover:bg-red-600">
      {
        isDeleting ? <Loader2 size={sizeIcon} className="animate-spin" />
        : <Trash size={sizeIcon} onClick={async () => await handleDelete(id)} />
      }
    </button>
  )
}