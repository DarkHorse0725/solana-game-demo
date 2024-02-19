import React, { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from './common/Button'

interface SimpleFormProps {
  name: string
  placeholder?: string
  subtitle?: string
  onSubmit: (value: string) => void
  useSubmitButton?: boolean
  submitButtonLabel?: string
  showSubmitOnCondition?: (value: string) => boolean
}

// Form with a single text-input field
export default function SimpleForm({
  name,
  placeholder,
  subtitle,
  onSubmit,
  useSubmitButton,
  submitButtonLabel,
  showSubmitOnCondition
}: SimpleFormProps) {
  const [input, setInput] = useState('')
  const [showSubmit, setShowSubmit] = useState(useSubmitButton)

  useEffect(() => {
    let condition
    if (!showSubmitOnCondition) {
      condition = true
    } else {
      condition = showSubmitOnCondition(input)
    }
    setShowSubmit(useSubmitButton && condition)
  }, [useSubmitButton, input, showSubmitOnCondition])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
    [setInput]
  )

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
      e.preventDefault()
      onSubmit(input)
    },
    [input, onSubmit]
  )

  const renderedSubtitle = useMemo(
    () => subtitle && <small className='ml-2 mb-2 block text-left text-sm'>{subtitle}</small>,
    [subtitle]
  )

  const submitButton = useMemo(() => {
    if (!showSubmit) {
      return null
    }

    return (
      <div className='z-1 absolute right-2 top-1/2 -translate-y-2/3 '>
        <Button
          color='gray'
          ghost={true}
          className='inline-block rounded-md px-4 py-1 text-center text-sm font-semibold text-black transition-colors hover:bg-blue-200'
          type='submit'
          onSubmit={handleSubmit}
        >
          {submitButtonLabel || 'Submit'}
        </Button>
      </div>
    )
  }, [showSubmit, submitButtonLabel, handleSubmit])

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <label className='relative' htmlFor={name}>
        <input
          className='relative w-full border border-gray-500 bg-gray-50 p-2 outline-none'
          type='text'
          name={name}
          value={input}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {submitButton}
        {renderedSubtitle}
      </label>
    </form>
  )
}
