import { useState } from "react"
import useLoginMutation from "../queries/useLoginMutation"
import Form from "../components/customForm/Form"
import useSessionContext from "../context/useSessionContext"
import { useNavigate, useLocation } from "react-router-dom"
import useLocalStorage from "../hooks/useLocalStorage"

export default function Login() {

  const {setSession} = useSessionContext()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const [credential, setCredentials] = useState({
    username: '',
    password: '',
    remember: false
  })

  const { mutateAsync: login, error, isLoading } = useLoginMutation()
  const { setValue } = useLocalStorage('persistLogin')

  const fields = [
    {
      name: 'username',
      value: credential.username,
      id: 'username',
      type: 'text',
      placeholder: 'Enter your username',
      minLength: 5,
      maxLength: 25,
      required: true
    },
    {
      name: 'password',
      value: credential.password,
      id: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      minLength: 8,
      required: true
    }
  ]

  const handleLogin = async () => {
    const res = await login(credential)
    if(res.data === undefined) return
    setSession(res.data)
    setValue(credential.remember)
    navigate(from, {replace: true})
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Form 
        formData={credential}
        setFormData={setCredentials}
        onSubmitFn={handleLogin}
        fields={fields}
        sendButtonText="Login"
        isLoading={isLoading}
        title="Login"
      >
        <div className="flex gap-2 items-center text-white">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            checked={credential.remember}
            onChange={() => setCredentials({...credential, remember: !credential.remember})}
          />
          <label htmlFor="remember">Remember me</label>
        </div>
      </Form>
      {error && <p className="error-message">{error.message}</p>}
    </div>
  )
}