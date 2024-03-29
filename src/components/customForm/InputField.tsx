import React, { useState } from 'react'

export type InputFieldProps = {
  value?: string|number|readonly string[]
  type: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  id: string
  required: boolean
  placeholder?: string
  maxLength?: number
  minLength?: number
  dontAllowWhiteSpaces?: boolean
  autoComplete?: string
}

export default function InputField({
  value,
  type,
  onChange,
  name,
  id,
  required,
  placeholder,
  maxLength,
  minLength,
  dontAllowWhiteSpaces,
  autoComplete
}: InputFieldProps) {

  const [message, setMessage] = useState('')

  const handleValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    let errorMessage = ''
    if (required && inputValue.trim() === '') {
      errorMessage = 'This field is required'
    } else if (minLength && inputValue.length < minLength && inputValue.length > 0) {
      errorMessage = `Min length is ${minLength} chars`
    } else if (maxLength && inputValue.length > maxLength && inputValue.length > 0) {
      errorMessage = `Max length is ${maxLength} chars`
    } else if(dontAllowWhiteSpaces && inputValue.includes(' ')){
      console.log('Spaces are not allowed')
      errorMessage = 'Spaces are not allowed'
    }
    setMessage(errorMessage)
    onChange(event)
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        autoComplete={autoComplete}
        type={type} 
        value={value} 
        onChange={handleValidation} 
        name={name} id={id} 
        required={required} 
        placeholder={placeholder} 
        maxLength={maxLength} 
        minLength={minLength}
        className={
          (message? 'focus:border-red-600' : 'focus:border-blue-600')
          + " focus:shadow p-2 rounded-xl bg-slate-800 text-white outline-none border border-slate-600 "
        }
      />
      {message.length>0 && <p className="error-message">{message}</p>}
    </div>
  )
}