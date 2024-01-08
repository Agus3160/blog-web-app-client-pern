import { useState } from "react"
import useLoginMutation from "../queries/useLoginMutation"
import Form from "../components/Form"
import useSessionContext from "../context/useSessionContext"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const {setSession} = useSessionContext()
  const navigate = useNavigate()
  const [credential, setCredentials] = useState({
    username: '',
    password: ''
  })

  const { mutateAsync: login, error, isLoading } = useLoginMutation()

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
      name: 'password',
      value: credential.password,
      id: 'password',
      type: 'password',
      placeholder: 'password',
      minLength: 8,
      required: true
    }
  ]

  const handleLogin = async () => {
    const res = await login(credential)
    if(res.data === undefined) return
    setSession(res.data)
    navigate('/')
  }

  return (
    <div>
      <h1>LogIn</h1>
      <Form 
        formData={credential}
        setFormData={setCredentials}
        onSubmitFn={handleLogin}
        fields={fields}
        sendButtonText="Login"
        isLoading={isLoading}
      />
      {error && <p className="error-message">{error.message}</p>}
    </div>
  )
}