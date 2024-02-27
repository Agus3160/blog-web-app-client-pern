import { useState } from "react"
import Form from "../../components/customForm/Form"
import useResetPassordSendEmail from "../../hooks/user/useResetPassordSendEmail"

export default function ResetPasswordSendEmail() {

  const [formData, setFormData] = useState({
    email: ''
  })

  const {mutateAsync:sendEmail, isLoading, isSuccess} = useResetPassordSendEmail()

  const fields = [
    {
      name: 'email',
      id: 'email',
      value: formData.email,
      autoComplete: 'off',
      type: 'email',
      placeholder: 'your_email@example.com',
      required: true
    }
  ]

  if(isSuccess) return (
    <div className="h-full flex flex-col items-center justify-center text-white">
      <h2 className="text-3xl font-bold">The email has been sent. Please check your invoice</h2>
    </div>
  )

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Form
        formData={formData}
        setFormData={setFormData}
        onSubmitFn={sendEmail}
        fields={fields}
        sendButtonText="Send Email"
        isLoading={isLoading}
        title="Reset Password"
      >
      </Form>
    </div>
  )
}