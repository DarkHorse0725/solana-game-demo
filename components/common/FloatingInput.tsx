import clsx from 'clsx'
import { HTMLAttributes } from 'react'

interface FloatingInputProps extends HTMLAttributes<HTMLInputElement> {
  id: string
  label: string
}

export const FloatingInput = ({ id, label, ...props }: FloatingInputProps) => {
  const inputClass = clsx(
    'peer h-10 w-full border-0 border-b-2 borer-gray-300 bg-transparent ring-transparent',
    'placeholder:text-transparent',
    'focus:outline-none focus:ring-0'
  )
  const labelClass = clsx(
    'absolute -top-3 block cursor-default text-sm font-medium text-gray-300 transition-all',
    'peer-placeholder-shown:top-1.5 peer-placeholder-shown:cursor-text peer-placeholder-shown:text-base',
    'peer-focus:-top-3 peer-focus:cursor-default peer-focus:text-sm'
  )

  return (
    <>
      <input id={id} className={inputClass} {...props} />
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
    </>
  )
}
