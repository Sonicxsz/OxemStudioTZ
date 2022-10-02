export const changeRangeBackground = (input) => {
  input = input.current
  const percent = (input.value - input.min) / (input.max - input.min)
  const per = percent * 100
  input.style.background = `linear-gradient(90deg,#FF9514 ${per}%, #E1E1E1 ${per}%)`
  return Math.round(percent * 60)
}

export const checkValues = ({ value = 0, min = 0, max = 100 }, set) => {
  value = value.toString().replace(/\s/g, '')
  value > max ? set(max) : value < min ? set(min) : set(value)
}

export const validateNum = (e) => {
  let value = e.target.value
  value = value.replace(/\D/g, '')
  e.target.value = value
  return e
}

export const mask = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
