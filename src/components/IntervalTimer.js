import {useState} from 'react'

const MS_IN_SECOND = 1000

function formatTime(time) {
  return {
    seconds: Math.floor(time / MS_IN_SECOND),
    tenMs: Math.floor((time % MS_IN_SECOND) / 10),
  }
}

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
