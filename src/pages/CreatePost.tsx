import { useState } from "react"
import Form from "../components/customForm/Form"
import TipTap from "../components/TipTap/TipTap"
import useUploadPostMutation from "../queries/useUploadPostMutation"

export default function CreatePost() {
  
  const [formData, setFormData] = useState({title: '', content: ''})

  const {mutateAsync: uploadPost, isLoading} = useUploadPostMutation(formData.title, formData.content)
  
  const handleUpload = async () => {
    await uploadPost()
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Form
        fields={[{name: 'title', value: formData.title, id: 'title', type: 'text', placeholder: 'Enter the title of the post', required: true}]}
        formData={formData}
        setFormData={setFormData}
        onSubmitFn={async() => await handleUpload()}
        sendButtonText="Upload"
        isLoading={isLoading}
        title="Create Post"
      >
        <TipTap placeholder="Enter the content of the post" onChange={(content) => setFormData({...formData, content})} />
      </Form>
    </div>
  )
}