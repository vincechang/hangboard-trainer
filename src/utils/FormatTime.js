export const MS_IN_SECOND = 1000

function padTwo(number) {
  return number >= 10 ? String(number) : `0${number}`
}
export function formatTime(time) {
  return {
    seconds: Math.floor(time / MS_IN_SECOND),
    tenMs: padTwo(Math.floor((time % MS_IN_SECOND) / 10)),
  }
}
