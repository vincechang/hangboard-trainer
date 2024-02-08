export const MS_IN_SECOND = 1000

export function formatTime(time) {
  return {
    seconds: Math.floor(time / MS_IN_SECOND),
    tenMs: Math.floor((time % MS_IN_SECOND) / 10),
  }
}
