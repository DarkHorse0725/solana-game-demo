/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import { getRandom } from '../utils/getRandom'
import router from 'next/router'
import { coins, inventories } from './GameData'
import ProgressBar from '../common/ProgressBar'
import useWindowDimensions from '../hooks/useWindowSize'
import Image from 'next/image'

const { Bodies, Engine, Events, Mouse, MouseConstraint, Render, Runner, World } = Matter

declare global {
  interface Window {
    engine: Matter.Engine
    runner: Matter.Runner
  }
}

interface GamePlayProp {
  width?: number
}

export default function GamePlay(props: GamePlayProp) {
  const [coinInserting, setCoinInserting] = useState(false)
  const { width, height } = useWindowDimensions()

  const canvas = useRef(null)
  const world = useRef<Matter.World>()
  const engineRef = useRef<Matter.Engine>()
  const runnerRef = useRef<Matter.Runner>()

  useEffect(() => {
    if (runnerRef.current) {
      Runner.stop(runnerRef.current as Matter.Runner)
      Engine.clear(engineRef.current as Matter.Engine)
    }

    createWorld()

    return () => {
      Runner.stop(runnerRef.current as Matter.Runner)
      Engine.clear(engineRef.current as Matter.Engine)
      router.reload()
    }
  }, [canvas, world])

  const WIDTH = 1000
  const HEIGHT = 500

  function createWorld() {
    const engine = Engine.create()
    engineRef.current = engine
    world.current = engine.world

    // create a renderer
    const render = Render.create({
      canvas: canvas.current || undefined,
      engine,
      options: {
        width: WIDTH,
        height: HEIGHT,
        background: 'transparent',
        showCollisions: false,
        showVelocity: false,
        showAxes: false,
        wireframes: false
      } as Matter.IRendererOptions
    }) as Matter.Render & { mouse: any }

    // Spin Walls
    World.add(engine.world, [
      Bodies.rectangle(WIDTH / 4, HEIGHT / 2, WIDTH / 2, 10, {
        isStatic: true,
        angle: Math.PI * 0.1,
        render: { fillStyle: '#f66a19' }
      }),
      Bodies.rectangle((WIDTH * 3) / 4, HEIGHT / 2, WIDTH / 2, 10, {
        isStatic: true,
        angle: Math.PI * -0.1,
        render: { fillStyle: '#f66a19' }
      }),
      Bodies.circle(WIDTH / 2, HEIGHT / 2 + 70, 50, {
        isStatic: true,
        render: { fillStyle: '#f66a19' }
      })
    ])

    // MOUSE
    const mouse = Mouse.create(render.canvas)
    render.mouse = mouse
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.5,
        render: {
          visible: true
        }
      } as Matter.Constraint
    })

    World.add(engine.world, mouseConstraint)

    let mouseIsDragging = false
    let intervalIds: Array<NodeJS.Timer> = []

    Matter.Events.on(mouseConstraint, 'startdrag', () => {
      mouseIsDragging = true
    })
    Matter.Events.on(mouseConstraint, 'enddrag', () => {
      mouseIsDragging = false
    })
    // Producing coins
    let produced: Array<number> = []
    coins.forEach((coin, index) => {
      produced[index] = 0
      intervalIds[index] = setInterval(() => {
        createBalls({ x: WIDTH / 2, y: 0 }, coin.logo, 5 / coin.amount)
        produced[index]++
        if (produced[index] > coin.amount) {
          clearInterval(intervalIds[index])
        }
      }, (1000 / 60) * 3)
    })

    //
    //
    // After Update
    //
    //
    Events.on(engine, 'afterUpdate', (ev) => {
      ev.source.world.bodies.forEach((b) => {
        if (b.position.x > WIDTH || b.position.x < 0 || b.position.y > HEIGHT) {
          World.remove(engine.world, b)
        }
      })
    })

    function createBalls(positionXY?: Matter.IMousePoint, logo?: string, scale?: number) {
      if (!positionXY) {
        return
      }

      World.add(
        engine.world,
        Bodies.circle(
          positionXY.x + getRandom(15) || WIDTH / 2,
          positionXY.y + getRandom(15) || HEIGHT / 2,
          100 * (scale || 1),
          {
            restitution: 0.7,
            render: {
              sprite: {
                texture: logo || 'imgs/default_logo.png',
                xScale: scale || 0.25,
                yScale: scale || 0.25
              }
            }
          }
        )
      )
    }

    Render.run(render)

    // create runner
    const runner = Runner.create() as Matter.Runner & {
      correction: number
      counterTimestamp: number
      delta: number
      // deltaHistory: number
      deltaMax: number
      deltaMin: number
      deltaSampleSize: number
      enabled: boolean
      fps: number
      frameCounter: number
      frameRequestId: number
      isFixed: boolean
      timePrev: number
      timeScalePrev: number
    }
    runnerRef.current = runner
    // run the engine
    Runner.run(runner, engine)

    // add To Global
    window.Matter = Matter
    window.engine = engine
    window.runner = runner
  }

  const handleInsertCoin = () => {
    setCoinInserting(true)
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <canvas style={{ width: `${width != undefined && width > 1000 ? 1000 : width}px` }} ref={canvas} />
      <div className='absolute top-[332px] flex flex-col items-center'>
        <button
          onClick={handleInsertCoin}
          className='h-[90px] w-[90px] cursor-pointer rounded-[50%] bg-[#fc7e26] text-white transition duration-300 hover:bg-[#fc8e06] sm:w-[90px]'
        >
          Insert Coin
        </button>
        {coinInserting && (
          <ProgressBar bgcolor='#fc7e26' completed={0} running={coinInserting} setRunning={setCoinInserting} />
        )}
      </div>
      <div className='flex h-full w-[95%] flex-col items-center rounded-md bg-[#000]/[.4] pt-[30px] backdrop-blur-sm sm:w-[90%] sm:p-[20px] md:w-[700px]'>
        <div className='mb-5 text-lg text-white'>Inventory</div>
        <div className='grid w-full grid-cols-[2fr_1fr_1fr] items-center pl-[20px] text-white'>
          {Object.keys(inventories[0]).map((header) => {
            return (
              <div key={header} className='mb-3'>
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </div>
            )
          })}
          {inventories.map((inventory) => {
            return (
              <>
                <div className='mb-5 flex items-center'>
                  <Image
                    className='mr-2 w-[30px] sm:mr-5 sm:w-[50px]'
                    src={inventory.item.logo}
                    alt='inventory item'
                    width={50}
                    height={50}
                  />
                  <div>
                    <div>{inventory.item.name}</div>
                    <a href={`https://solscan.io/token/${inventory.item.address}`}>
                      {`${inventory.item.address.substring(0, 4)}...${inventory.item.address.substring(40, 43)}`}
                    </a>
                  </div>
                </div>
                <div>{inventory.amount}</div>
                <div>{inventory.chance}</div>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}
