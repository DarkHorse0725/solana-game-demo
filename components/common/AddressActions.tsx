import { compressAddress } from '@/utils'
import { ClipboardDocumentIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'
import { Copyable } from './Copyable'

type ActionsAddressProps = {
  address: string | PublicKey
  className?: string
}

export const AddressActions = ({ address, className }: ActionsAddressProps) => {
  const address58 = useMemo(
    () => (typeof address === 'string' ? address : address.toBase58()),
    [address]
  )
  className = className ? className : 'flex items-center gap-x-2 text-2xl font-semibold' 
  // TODO classes, get network name

  return (
    <span className={className}>
      {compressAddress(4, address58)}
      <Copyable content={address58}>
        <ClipboardDocumentIcon className='h-5 w-5 hover:cursor-pointer hover:text-gray-200' />
      </Copyable>
      <a
        rel='noreferrer'
        target='_blank'
        href={`https://explorer.solana.com/address/${address58}?cluster=devnet`}
      >
        <MagnifyingGlassIcon className='h-5 w-5 hover:cursor-pointer hover:text-gray-200' />
      </a>
    </span>
  )
}
