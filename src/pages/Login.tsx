import { useState } from "react"
import useLoginMutation from "../queries/auth/useLoginMutation"
import Form from "../components/customForm/Form"
import useLocalStorage from "../hooks/useLocalStorage"

export default function Login() {

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    persistLogin: false
  })

  const { mutateAsync: login, isLoading } = useLoginMutation()
  const { setValue } = useLocalStorage('persistLogin')

  const fields = [
    {
      name: 'username',
      id: 'username',
      value: loginData.username,
      type: 'text',
      placeholder: 'Enter your username',
      minLength: 5,
      maxLength: 25,
      required: true
    },
    {
      name: 'password',
      id: 'password',
      value: loginData.password,
      type: 'password',
      placeholder: 'Enter your password',
      minLength: 8,
      required: true
    }
  ]



  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Form
        formData={loginData}
        setFormData={setLoginData}
        onSubmitFn={login}
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
            checked={loginData.persistLogin}
            onChange={() => {
              setValue(!loginData.persistLogin)
              setLoginData({...loginData, persistLogin:!loginData.persistLogin})
            }}
          />
          <label htmlFor="remember">Remember me</label>
        </div>
      </Form>
    </div>
  )
}