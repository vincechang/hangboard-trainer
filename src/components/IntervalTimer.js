import {useState} from 'react'
import {formatTime} from '../utils/FormatTime'

function IntervalTimer({sequence}) {
  const [duration] = useState(6999)
  const [isRunning, setIsRunning] = useState(false)

  const formattedTime = formatTime(duration)

  function toggleTimer() {
    if (isRunning) {
      setIsRunning(false)
    } else {
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
