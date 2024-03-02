import React from 'react'

type Props = {
  values?: string[]
  name: string
  id: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  labelText?: string
}

export default function SelectInput({ values, name, labelText, id, onChange}: Props) {
  return (
    <div className='flex w-full gap-2 items-center'>
      <label htmlFor={id} className="text-white text-center ">{labelText}</label>
      <select name={name} id={id} onChange={onChange} className="w-full bg-slate-800 text-white outline-none border border-slate-600 p-2 rounded-xl"> 
        {values?.map((value) => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
    </div>
  )
}