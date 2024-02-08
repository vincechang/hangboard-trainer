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

  function toggleTimer() {
    if (isRunning) {
      setIsRunning(false)
    } else {
      lastTick.current = Date.now()
      setIsRunning(true)
    }
  }

  return (
    <div>
      <button onClick={toggleTimer}>
        <span>
          <span>{formattedTime.seconds}</span>
          <span>s</span>
        </span>
        <span>{formattedTime.tenMs}</span>
      </button>
      <div>
        <button onClick={toggleTimer}>{isRunning ? 'Stop' : 'Start'}</button>
        <button>Reset</button>
      </div>
    </div>
  )
}

export default IntervalTimer
