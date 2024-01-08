import InputField, { InputFieldProps } from "./InputField"

type listFields = Omit<InputFieldProps, 'onChange'>[]

type Props<T>= {
  onSubmitFn: () => Promise<void>
  formData: T
  setFormData: (data: T) => void
  sendButtonText: string
  fields: listFields
  isLoading?: boolean
}

export default function Form<T>({formData, setFormData, onSubmitFn, fields, sendButtonText, isLoading}: Props<T>) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
    console.log(formData)
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await onSubmitFn()
      }}
    >
      {fields.map((field, index) => {
        return <InputField
          key={index}
          value={field.value}
          type={field.type}
          onChange={handleChange}
          name={field.name}
          id={field.id}
          required={field.required}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          minLength={field.minLength}
        />
      })}
      <button type="submit" disabled={isLoading}>{sendButtonText}</button>
    </form>
  )
}