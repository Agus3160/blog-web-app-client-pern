import { useState } from "react"
import Form from "../components/customForm/Form"
import TipTap from "../components/TipTap/TipTap"
import { useParams } from "react-router-dom"
import useGetPostByIdQuery from "../queries/useGetPostByIdQuery"

export default function EditPost() {

  const { id } = useParams()

  const [formData, setFormData] = useState({
    title: '', 
    content: ''
  })

  const { data: post, isLoading, isError } = useGetPostByIdQuery(id as string)

  if(isLoading) return <div>Loading...</div>

  if(!post || isError) return <div>Post not found</div>
  
  setFormData({title: post?.title, content: post?.content})

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Form
        fields={[{name: 'title', value: formData.title, id: 'title', type: 'text', placeholder: 'Enter the title of the post', required: true}]}
        formData={formData}
        setFormData={setFormData}
        onSubmitFn={async() => console.log(formData)}
        sendButtonText="Save Changes"
        isLoading={false}
        title="Create Post"
      >
        <TipTap content={post.content} placeholder="Enter the content of the post" onChange={(content) => setFormData({...formData, content})} />
      </Form>
    </div>
  )
}