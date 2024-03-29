import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useSessionContext from "../../context/useSessionContext"
import Form from "../../components/customForm/Form"
import TipTap from "../../components/TipTap/TipTap"
import { useParams } from "react-router-dom"
import useGetPostByIdQuery from "../../queries/posts/useGetPostByIdQuery"
import useEditPostMutation from "../../queries/posts/useEditPostMutation"
import UploadImage from "../../components/UploadImage"
import { PostPutReq } from "../../vite-env"

export default function EditPost() {

  const { id } = useParams()
  const {session} = useSessionContext()
  const navigate = useNavigate()

  const [postData, setPostData] = useState<PostPutReq>({
    title: '',
    content: '',
    newImage: '',
    oldImageUrl: null
  })

  const { data: res, isLoading, isError } = useGetPostByIdQuery(id as string)
  const { mutateAsync: editPost, isLoading: isEditing } = useEditPostMutation(id as string)

  useEffect(() => {
    if(res?.data) {
      const {title, content, author, imageUrl} = res.data
      if(author !== session?.username && session?.role !== 'ADMIN') navigate('/', {replace:true})
      setPostData({newImage:'', title:title, content: content, oldImageUrl: imageUrl})
    }
  }, [res, session, navigate, id])


  if(isLoading) return <div>Loading...</div>
  if(!res || isError) return <div>Post not found</div>

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Form
        fields={[{name: 'title', id: 'title', type: 'text', value: postData.title, placeholder: 'Enter the title of the post', required: true}]}
        formData={postData}
        setFormData={setPostData}
        onSubmitFn={editPost}
        sendButtonText="Save Changes"
        isLoading={isEditing}
        title="Create Post"
      >
        <TipTap content={res.data?.content} placeholder="Enter the content of the post" onChange={(content) => setPostData({...postData, content})} />
        <UploadImage preloadImage={postData.oldImageUrl} advice="To change the image of the post, upload a new one" setImage={(newImage) => setPostData({...postData, newImage})} message="Upload an image" />
      </Form>
    </div>
  )
}