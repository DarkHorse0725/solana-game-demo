import React, { useState, useEffect } from 'react'
import GamePlay from './GamePlay'
import useWindowSize from '../hooks/useWindowSize'

const Game = () => {
  return (
    <div>
      <GamePlay />
    </div>
  )
}

export default Game
