import clsx from 'clsx'
import { ChangeEvent, HTMLAttributes, HTMLInputTypeAttribute, useState } from 'react'

type ValidatedInputProps = {
  validator: (input: string) => boolean
  helperText?: string
  type?: HTMLInputTypeAttribute
} & HTMLAttributes<HTMLInputElement>

export const ValidatedInput = (props: ValidatedInputProps) => {
  const { validator, helperText, type, className, ...rest } = props
  const [hasError, setHasError] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value) {
      setHasError(false)
      return
    }
    try {
      const output = validator(value)
      setHasError(!output)
    } catch {
      setHasError(true)
    }
  }

  return (
    <div className='flex flex-col'>
      <input
        required
        type={type}
        onChange={handleChange}
        className={className + 'border-2 border-red-600'}
        {...rest}
      />
      {helperText && (
        <span className={clsx('text-md text-red-500', hasError ? 'visible' : 'invisible')}>
          {helperText}
        </span>
      )}
    </div>
  )
}
