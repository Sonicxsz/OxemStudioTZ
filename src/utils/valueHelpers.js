export const changeRangeBackground = (input) => {
  input = input.current
  const per = (input.value - input.min) / (input.max - input.min) * 100
  input.style.background = `linear-gradient(90deg,#FF9514 ${per}%, #E1E1E1 ${per}%)`
  return Math.round(per)
}

export const checkValues = ({ value = 0, min = 0, max = 100 }, set) => {
  value = value.toString().replace(/\s/g, '')
  value > max ? set(mask(max)) : value < min ? set(mask(min)) : set(mask(value))
}

export const validateNum = (e) => {
  let value = e.target.value
  value = value.replace(/\D/g, '')
  e.target.value = value
  return e
}

export const mask = (num, symbol = false) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
