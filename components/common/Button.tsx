import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  color?: 'black' | 'gray' | 'white' | 'red' | 'lime' | 'green' | 'blue' | 'yellow' | 'purple' | 'light-slate'
  ghost?: boolean
  disabled?: boolean
}

export const Button: FC<IButtonProps> = ({
  children,
  color,
  className,
  ghost = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}: IButtonProps) => {
  const handleColour = () => {
    if (disabled) {
      return 'border-gray-200 bg-gray-200 text-white'
    }

    switch (color) {
      case 'black':
        return `border-black hover:bg-gray-900 ${ghost ? 'text-black bg-transparent hover:text-white' : 'bg-black text-white'}`

      case 'gray':
        return `border-gray-400 hover:bg-gray-300 ${ghost ? 'text-gray-400 bg-transparent hover:text-white' : 'bg-gray-400 text-white'}`

      case 'white':
        return `border-white hover:bg-gray-100 ${ghost ? 'text-white bg-transparent hover:text-black' : 'bg-white text-black'}`

      case 'red':
        return `border-red-600 hover:bg-red-500 ${ghost ? 'text-red-600 bg-transparent hover:text-white' : 'bg-red-600 text-white'}`

      case 'lime':
        return `border-lime-600 hover:bg-lime-500 ${ghost ? 'text-lime-600 bg-transparent hover:text-white' : 'bg-lime-600 text-white'}`

      case 'green':
        return `border-green-600 hover:bg-green-500 ${ghost ? 'text-green-600 bg-transparent hover:text-white' : 'bg-green-600 text-white'}`

      case 'blue':
        return `border-blue-600 hover:bg-blue-500 ${ghost ? 'text-blue-600 bg-transparent hover:text-white' : 'bg-blue-600 text-white'}`

      case 'yellow':
        return `border-yellow-500 hover:bg-yellow-400 ${ghost ? 'text-yellow-500 bg-transparent hover:text-white' : 'bg-yellow-500 text-white'}`

      case 'purple':
        return `border-purple-700 hover:bg-purple-600 ${ghost ? 'text-purple-700 bg-transparent hover:text-white' : 'bg-purple-700 text-white'}`

      case 'light-slate':
        return `border-slate-400 bg-slate-700 hover:bg-slate-600 text-white`

      default:
        return ''
    }
  }

  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      className={`inline-flex justify-center items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} border-solid border-2 rounded-lg p-2 font-semibold ${handleColour()} ${className}`}
    >
      {children}
    </button>
  )
}
