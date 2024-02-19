import { useEffect, useRef } from 'react'
import { update } from 'jdenticon'

export const Jdenticon = ({ size = '100%', value = 'test-value' }) => {
  const iconRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (iconRef?.current) {
      update(iconRef.current, value)
    }
  }, [value])

  return <svg data-jdenticon-value={value} height={size} ref={iconRef} width={size} />
}
