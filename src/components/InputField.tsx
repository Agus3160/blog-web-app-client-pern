import React, { useState } from 'react'

export type InputFieldProps = {
  value: string
  type: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  id: string
  required: boolean
  placeholder?: string
  maxLength?: number
  minLength?: number
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
  minLength
}: InputFieldProps) {

  const [message, setMessage] = useState('')

  const handleValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    let errorMessage = ''
    if (required && inputValue.trim() === '') {
      errorMessage = 'This field is required'
    } else if (minLength && inputValue.length < minLength) {
      errorMessage = `Min length is ${minLength} chars`
    } else if (maxLength && inputValue.length > maxLength) {
      errorMessage = `Max length is ${maxLength} chars`
    } 
    setMessage(errorMessage)
    onChange(event)
  }

  return (
    <>
      <input 
        type={type} 
        value={value} 
        onChange={handleValidation} 
        name={name} id={id} 
        required={required} 
        placeholder={placeholder} 
        maxLength={maxLength} 
        minLength={minLength}
      ></input>

      {message.length>0 && <p className="error-message">{message}</p>}
    </>
  )
}