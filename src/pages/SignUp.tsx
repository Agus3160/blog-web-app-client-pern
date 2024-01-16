import { useState } from "react"
import useSignUpMutation from "../queries/useSignUpMutation"
import Form from "../components/customForm/Form"


export default function SignUp() {

  const [credential, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  })

  const {mutateAsync: signUp, error, isLoading } = useSignUpMutation()

  const fields = [
    {
      name: 'username',
      value: credential.username,
      id: 'username',
      type: 'text',
      placeholder: 'Create your username',
      minLength: 5,
      maxLength: 25,
      required: true
    },
    {
      name: 'email',
      value: credential.email,
      id: 'email',
      type: 'email',
      placeholder: 'Create your email',
      required: true
    },
    {
      name: 'password',
      value: credential.password,
      id: 'password',
      type: 'password',
      placeholder: 'Create your password',
      minLength: 8,
      required: true
    }
  ]

  const handleSignUp = async () => {
    await signUp(credential)
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Form 
        formData={credential}
        setFormData={setCredentials}
        onSubmitFn={handleSignUp}
        fields={fields}
        sendButtonText="Sign Up"
        isLoading={isLoading}
        title="Sign Up"
      />
      {error && <p className="error-message">{error.message}</p>}
    </div>
  )
}