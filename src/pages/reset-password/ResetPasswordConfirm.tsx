import { useState } from "react"
import Form from "../../components/customForm/Form"
import { useParams } from "react-router-dom"
import useResetPasswordConfirm from "../../hooks/user/useResetPasswordConfirm"

export default function ResetPasswordSendEmail() {

  const [formData, setFormData] = useState({
    password: ''
  })

  const {token} = useParams()

  const {mutateAsync:sendEmail, isLoading} = useResetPasswordConfirm(token)

  const fields = [
    {
      name: 'password',
      id: 'password',
      value: formData.password,
      autoComplete: 'off',
      type: 'password',
      minLength : 8,
      placeholder: 'Enter your new password',
      required: true
    }
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Form
        formData={formData}
        setFormData={setFormData}
        onSubmitFn={sendEmail}
        fields={fields}
        sendButtonText="Reset Password"
        isLoading={isLoading}
        title="Reset Password"
      >
      </Form>
    </div>
  )
}