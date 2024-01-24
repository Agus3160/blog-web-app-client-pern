import InputField, { InputFieldProps } from "./InputField"
import { ApiResponseScheme } from "../../vite-env"
import useStateToasterHandler from "../../hooks/useStateToasterHandler"
import { Loader2 } from "lucide-react"

type listFields = Omit<InputFieldProps, 'onChange'>[]

type Props<T,D>= {
  onSubmitFn: (d:T) => Promise<ApiResponseScheme<D>>
  formData : T
  setFormData : React.Dispatch<React.SetStateAction<T>>
  sendButtonText: string
  fields: listFields
  title?: string
  isLoading?: boolean
  children?: React.ReactNode
}

export default function Form<T,D>({
  formData,
  setFormData,
  onSubmitFn, 
  fields, 
  sendButtonText, 
  isLoading, 
  title, 
  children, 
}: Props<T,D>) {

  const { errorHandler, successHandler } = useStateToasterHandler()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <form
      className="flex flex-col p-5 gap-5 rounded-xl bg-slate-800 sm:w-1/2 w-11/12"
      onSubmit={async (e) => {
        e.preventDefault()
        try{
          const res = await onSubmitFn(formData)
          successHandler(res)
        }catch(err){
          errorHandler(err)  
        }
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
      >
        <div className="flex items-center justify-center gap-2">
          {isLoading && <Loader2 
            className="animate-spin"
          />}
          {sendButtonText}
        </div>
      </button>
    </form>
  )
}