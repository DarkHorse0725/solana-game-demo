import React, { useState, useEffect } from 'react'

interface ProgressBarProps {
  bgcolor?: string
  completed?: number
  running?: boolean
  setRunning: (running: boolean) => void
}
const ProgressBar = (props: ProgressBarProps) => {
  const { bgcolor, running, setRunning } = props
  const [progress, setProgress] = useState(0)
  const [timer, setTimer] = useState<NodeJS.Timer>()

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setProgress((prev) => prev + 1)
      }, 100)
      setTimer(interval)
    } else {
      clearInterval(timer)
    }
  }, [running, timer])

  useEffect(() => {
    if (progress >= 100) {
      setRunning(false)
      clearInterval(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  return (
    <div className='relative mt-[20px] h-[15px] w-[100px] rounded-lg bg-[#a0a0a0]'>
      <div style={{width: `${progress}px`}} className={`h-[100%] bg-[${bgcolor}] rounded-lg`} />
      <div className='absolute top-0 left-0 w-full text-[10px] text-white text-center'>
        {progress > 75
          ? `Collecting prizes`
          : progress > 75
          ? `Paying out prizes`
          : progress > 50
          ? `Rolling for prizes`
          : `Inserting Coin`}
      </div>
    </div>
  )
}

export default ProgressBar
