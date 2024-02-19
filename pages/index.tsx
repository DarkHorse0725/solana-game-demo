import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Game from '../components/Game'
import backImage from '/public/imgs/bg1.png'

const Index: NextPage = () => {
  return (
    <main className='flex h-full w-full flex-col items-center justify-center'>
      <Image className='background h-full w-full' src={backImage} alt='background' />
      <Game></Game>
    </main>
  )
}

export default Index
