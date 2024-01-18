import InputField, { InputFieldProps } from "./InputField"

type listFields = Omit<InputFieldProps, 'onChange'>[]

type Props<T>= {
  onSubmitFn: () => Promise<void>
  formData: T
  setFormData: (data: T) => void
  sendButtonText: string
  fields: listFields
  title?: string
  isLoading?: boolean
  children?: React.ReactNode
}

export default function Form<T>({formData, setFormData, onSubmitFn, fields, sendButtonText, isLoading, title, children}: Props<T>) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <form
      className="flex flex-col p-5 gap-5 rounded-xl bg-slate-800 sm:w-1/2 w-11/12"
      onSubmit={async (e) => {
        e.preventDefault()
        await onSubmitFn()
      }}
    >
      {title && <h2 className="text-white text-center">{title}</h2>}
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
      {children}
      <button 
        className="bg-slate-600 p-2 rounded-xl text-white hover:bg-slate-700 disabled:bg-slate-500" 
        type="submit" 
        disabled={isLoading}
      >{sendButtonText}
      </button>
    </form>
  )
}