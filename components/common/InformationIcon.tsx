import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { ClickPopover } from './ClickPopover'

export const InformationIcon = ({ info }: { info: string | string[] }) => {
  info = typeof info === 'string' ? [info] : info

  return (
    <ClickPopover
      panel={
        <div className='flex flex-col gap-y-4 rounded-lg bg-slate-50 px-4 py-2 text-sm font-normal leading-4 text-gray-900 shadow ring-1 ring-blue-900/25 sm:px-6 md:w-80'>
          <ul role='list' className='divide-y divide-gray-200 text-left'>
            {info.map((item, idx) => (
              <li key={idx} className='py-3'>
                {item}
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <InformationCircleIcon className='ml-2 h-5 w-5 hover:cursor-pointer hover:text-slate-300 focus:text-slate-300' />
    </ClickPopover>
  )
}
