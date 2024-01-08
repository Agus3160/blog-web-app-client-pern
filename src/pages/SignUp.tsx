import { useState } from "react"
import useSignUpMutation from "../queries/useSignUpMutation"
import Form from "../components/Form"


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
      placeholder: 'username',
      minLength: 5,
      maxLength: 25,
      required: true
    },
    {
      name: 'email',
      value: credential.email,
      id: 'email',
      type: 'email',
      placeholder: 'email',
      required: true
    },
    {
      name: 'password',
      value: credential.password,
      id: 'password',
      type: 'password',
      placeholder: 'password',
      minLength: 8,
      required: true
    }
  ]

  const handleSignUp = async () => {
    await signUp(credential)
  }

  return (
    <div>
      <h1>SignUp</h1>
      <Form 
        formData={credential}
        setFormData={setCredentials}
        onSubmitFn={handleSignUp}
        fields={fields}
        sendButtonText="Sign Up"
        isLoading={isLoading}
      />
      {error && <p className="error-message">{error.message}</p>}
    </div>
  )
}