import clsx from 'clsx'
import { CSSProperties, ReactNode } from 'react'

interface ContentBoxProps {
  children: ReactNode | ReactNode[]
  icon?: ReactNode
  title?: string | ReactNode
  styles?: CSSProperties
  className?: string
}

export const ContentBox = ({ title, children, className, styles, icon }: ContentBoxProps) => {
  return (
    <div style={styles} className={clsx('flex flex-col justify-center', className)}>
      <div className='mt-3 h-max rounded-lg bg-slate-700 p-6 shadow-inner'>
        <h4 className='my-2 text-left text-xl font-bold text-white'>
          <div className='flex items-center space-x-2'>
            {icon}
            <span>{title}</span>
          </div>
        </h4>
        {children}
      </div>
    </div>
  )
}
