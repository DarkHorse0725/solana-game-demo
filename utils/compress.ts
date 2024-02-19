export const compressAddress = (charLen: number, address: string) => {
  return address.slice(0, charLen) + '...' + address.slice(address.length - charLen, address.length)
}
