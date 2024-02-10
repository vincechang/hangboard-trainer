import {useRef, useState} from 'react'
import {formatTime, MS_IN_SECOND} from '../utils/FormatTime'
import {useInterval} from '../hooks/UseInterval'

const HANG = 'HANG'
const OFF = 'OFF'
const REST = 'REST'

const HANG_DURATION = 7
const OFF_DURATION = 3
const REST_DURATION = 60

function IntervalTimer({sequence}) {
  const lastTick = useRef(null)
  const [duration, setDuration] = useState(6999)
  const [isRunning, setIsRunning] = useState(false)
  const [state, setState] = useState(HANG)

  const formattedTime = formatTime(duration)

  useInterval(
    () => {
      const now = Date.now()
      const timePassed = now - lastTick.current
      setDuration(duration => {
        let newDuration = duration - timePassed
        if (newDuration < 0) {
          if (state === HANG) {
            newDuration += OFF_DURATION * MS_IN_SECOND
            setState(OFF)
          } else if (state === OFF) {
            newDuration += HANG_DURATION * MS_IN_SECOND
            setState(HANG)
          } else if (state === REST) {
            newDuration += HANG_DURATION * MS_IN_SECOND
          }
        }
        return newDuration
      })
      lastTick.current = Date.now()
    },
    isRunning ? 1 : null,
  )

  function startTimer() {
    lastTick.current = Date.now()
    setIsRunning(true)
  }

  function toggleTimer() {
    if (isRunning) {
      setIsRunning(false)
    } else {
      startTimer()
    }
  }

  const stateColors = {
    HANG: 'bg-nord11',
    OFF: 'bg-nord13',
    REST: 'bg-nord08',
  }

  return (
    <div className={`w-40 p-3 rounded-md ${stateColors[state]}`}>
      <button
        className="items-baseline bg-transparent border-none cursor-pointer flex gap-4 select-none mx-auto"
        onClick={toggleTimer}
      >
        <span>
          <span className="text-6xl">{formattedTime.seconds}</span>
          <span className="text-2xl">s</span>
        </span>
        <span className="text-4xl">{formattedTime.tenMs}</span>
      </button>
      <div className="flex justify-between">
        <button>Reset</button>
        <button onClick={toggleTimer}>{isRunning ? 'Stop' : 'Start'}</button>
      </div>
    </div>
  )
}

export default IntervalTimer
