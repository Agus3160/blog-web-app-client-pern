import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useSessionContext from "../context/useSessionContext"
import Form from "../components/customForm/Form"
import TipTap from "../components/TipTap/TipTap"
import { useParams } from "react-router-dom"
import useGetPostByIdQuery from "../queries/useGetPostByIdQuery"
import useEditPostMutation from "../queries/useEditPostMutation"

export default function EditPost() {

  const { id } = useParams()
  const {session} = useSessionContext()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(
    {
      title: '',
      content: ''
    }
  )

  const { data: post, isLoading, isError } = useGetPostByIdQuery(id as string)
  const { mutateAsync: editPost, isLoading: isEditing } = useEditPostMutation(id as string)

  useEffect(() => {
    if(post) {
      if(post.author !== session?.username) navigate('/', {replace:true})
      setFormData({
        title: post.title,
        content: post.content
      })
    }
  }, [post, session, navigate])


  const handleEditPost = async () => {
    await editPost(formData)
  }

  if(isLoading) return <div>Loading...</div>

  if(!post || isError) return <div>Post not found</div>

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Form
        fields={[{name: 'title', value: formData.title, id: 'title', type: 'text', placeholder: 'Enter the title of the post', required: true}]}
        formData={formData}
        setFormData={setFormData}
        onSubmitFn={async() => await handleEditPost()}
        sendButtonText="Save Changes"
        isLoading={isEditing}
        title="Create Post"
      >
        <TipTap content={post.content} placeholder="Enter the content of the post" onChange={(content) => setFormData({...formData, content})} />
      </Form>
    </div>
  )
}