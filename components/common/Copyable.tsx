import clsx from 'clsx'
import React, { ReactNode, useState } from 'react'
import { Button } from './Button'

interface CopyableProps {
  content: string
  className?: string
  children?: ReactNode
}

export const Copyable = ({ content, children, className }: CopyableProps) => {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return
    }
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const cls = clsx(
    'absolute right-1/2 top-full z-10 origin-top translate-x-1/2 rounded-sm bg-black px-4 py-2 text-center text-gray-50 transition-transform',
    copied ? 'scale-100' : 'scale-0'
  )

  return (
    <button
      className={`cursor-pointer relative ${className || ''}`}
      onClick={handleClick}
    >
      <div className={cls}>Copied!</div>
      {children}
    </button>
  )
}
