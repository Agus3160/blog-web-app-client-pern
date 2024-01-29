import { useState } from "react"
import Form from "../components/customForm/Form"
import TipTap from "../components/TipTap/TipTap"
import useUploadPostMutation from "../queries/posts/useUploadPostMutation"
import UploadImage from "../components/UploadImage"

export default function CreatePost() {
  
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image: ''
  })

  const {mutateAsync: uploadPost, isLoading} = useUploadPostMutation()

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Form
        fields={[{name: 'title', id: 'title', value: postData.title, type: 'text', placeholder: 'Enter the title of the post', required: true}]}
        formData={postData}
        setFormData={setPostData}
        onSubmitFn={uploadPost}
        sendButtonText="Upload"
        isLoading={isLoading}
        title="Create Post"
      >
        <TipTap placeholder="Enter the content of the post" onChange={(content) => setPostData({...postData, content})} />
        <UploadImage setImage={(image) => setPostData({...postData, image})} message="Upload an image" />
      </Form>
    </div>
  )
}