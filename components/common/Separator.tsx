interface SeparatorProps {
  label: string
  position?: 'left' | 'right' | 'center'
  className?: string
}

export function Separator({ label }: SeparatorProps) {
  return (
    <div className="mt-4 flex whitespace-nowrap text-center after:top-1/2 after:ml-2 after:w-full after:translate-y-1/2 after:border-t after:border-solid after:border-gray-700 after:content-['']">
      <span className='whitespace-nowrap text-center text-2xl capitalize text-zinc-700'>
        {label}
      </span>
    </div>
  )
}
