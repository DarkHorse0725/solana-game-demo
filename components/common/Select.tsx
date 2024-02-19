/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, FC, ReactNode } from 'react'

export interface ISelectProps {
  options: string[]
  defaultOption?: string
  className?: string
  handler?: (selected: string) => unknown
  closeHandler?: () => unknown
}

export const Select: FC<ISelectProps> = ({ options, className, handler, closeHandler, defaultOption }: ISelectProps) => {
  const [selected, setSelected] = useState<string>(defaultOption || options[0])
  const [open, setOpen] = useState(false)
  
  const changeSelected = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (!e.target) return

    const { id } = e.target as HTMLDivElement
    
    if (handler) handler(id)
    else setSelected(id)
    setOpen(false)
  }

  const handleOpenSelect = (): void => {
    setOpen(true)
  }
  useEffect(() => {
    if(!open){
      if (closeHandler) closeHandler()
    }
  }, [open])
  useEffect(() => {
    const closeSelect = (e: MouseEvent): void => {
      if (!e.target) return
      if (!(e.target as HTMLDivElement).classList.contains('select-option')) setOpen(false)
    }

    document.body.addEventListener('click', closeSelect)

    return () => {
      document.body.removeEventListener('click', closeSelect)
    }
  })

  const mapOptions = (): ReactNode => (
    options.map((option) =>
      <div
        key={option}
        id={option}
        className='inline-flex w-full justify-center p-1 my-1 hover:cursor-pointer select-option'
        onClick={changeSelected}
        role='option'
        aria-selected={option === selected}
      >
        {option}
      </div>
    )
  )

  return (
    <div className='relative select-container' role='listbox'>
      <div className={`relative flex flex-column justify-center items-center hover:cursor-pointer z-20 select-option select-selected ${className}`} role='option' aria-selected={true} onClick={handleOpenSelect}>
        {defaultOption || selected}
      </div>
      <div className={`transition-all duration-300 absolute p-1 ${open ? 'top-14' : 'top-10'} ${open ? 'opacity-100' : 'opacity-0'} w-full ${open ? 'z-10' : '-z-10'} text-white text-sm bg-slate-800 rounded-md select-option`} role='listbox'>
        {mapOptions()}
      </div>
    </div>
  )
}
