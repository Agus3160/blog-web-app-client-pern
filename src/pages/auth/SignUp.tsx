import useSignUpMutation from "../../queries/auth/useSignUpMutation"
import Form from "../../components/customForm/Form"
import { useState } from "react"
import UploadImage from "../../components/UploadImage"
import { RegisterCredentials } from "../../vite-env"
import { Roles } from "../../enums"
import SelectInput from "../../components/customForm/SelectInput"

export default function SignUp() {

  const {mutateAsync: signUp, isLoading } = useSignUpMutation()

  const [signUpData, setSignUpData] = useState<RegisterCredentials>({
    username: '',
    email: '',
    password: '',
    image: null, 
    role: Roles.USER
  })

  console.log(signUpData)

  const fields = [
    {
      name: 'username',
      id: 'username',
      autoComplete: 'off',
      value: signUpData.username,
      dontAllowWhiteSpaces:true,
      type: 'text',
      placeholder: 'Create your username',
      minLength: 5,
      maxLength: 25,
      required: true
    },
    {
      name: 'email',
      value: signUpData.email,
      dontAllowWhiteSpaces:true,
      id: 'email',
      type: 'email',
      placeholder: 'Write your email',
      required: true
    },
    {
      name: 'password',
      value: signUpData.password,
      dontAllowWhiteSpaces:true,
      id: 'password',
      type: 'password',
      placeholder: 'Create your password',
      minLength: 8,
      required: true
    }
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Form
        formData={signUpData}
        setFormData={setSignUpData}
        onSubmitFn={signUp}
        fields={fields}
        sendButtonText="Sign Up"
        isLoading={isLoading}
        title="Sign Up"
      >
        <SelectInput values={[Roles.USER, Roles.ADMIN]} name="role" id="role" labelText="Role:" onChange={(e)=> setSignUpData({...signUpData, role: e.target.value as Roles})}/>
        <UploadImage setImage={(s)=> setSignUpData({...signUpData, image: s})} message="Upload your profile image..."/>
      </Form>
    </div>
  )
}