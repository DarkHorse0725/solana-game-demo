import dayjs from 'dayjs'

export function* chunks<T>(arr: T[], size = 100) {
  for (let i = 0; i < arr.length; i += size) {
    yield arr.slice(i, i + size)
  }
}

export function durationToSeconds(duration: number, unit: 'days' | 'weeks' | 'months' | 'years') {
  return dayjs.duration({ [unit]: duration }).asSeconds()
}

export function secondsToDays(duration: number) {
  return dayjs.duration({ seconds: duration }).asDays()
}

export function removeNulChars(str: string) {
  return str.replace(/\0/g, '')
}
