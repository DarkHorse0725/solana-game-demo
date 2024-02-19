import { ReactNode, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { usePopper } from 'react-popper'

type ClickPopoverProps = {
  panel: ReactNode
  children: ReactNode
}

export const ClickPopover = ({ panel, children }: ClickPopoverProps) => {
  let [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null)
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  let { styles, attributes } = usePopper(referenceElement, popperElement)

  return (
    <Popover as='button' className='relative z-10 flex items-center justify-center'>
      <>
        <Popover.Button as='button' ref={setReferenceElement}>
          {children}
        </Popover.Button>

        <Transition
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
        >
          <Popover.Panel
            as='div'
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {panel}
          </Popover.Panel>
        </Transition>
      </>
    </Popover>
  )
}
