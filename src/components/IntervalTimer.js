import {useState} from 'react'
import {formatTime} from '../utils/FormatTime'

function IntervalTimer({sequence}) {
  const [duration] = useState(6999)

  const formattedTime = formatTime(duration)

  return (
    <div>
      <button>
        <span>
          <span>{formattedTime.seconds}</span>
          <span>s</span>
        </span>
        <span>{formattedTime.tenMs}</span>
      </button>
      <div>
        <button>Start</button>
        <button>Reset</button>
      </div>
    </div>
  )
}

export default IntervalTimer
