import { useEffect, useState, useRef } from 'react'
import { changeRangeBackground, checkValues, validateNum, mask } from '../../utils/valueHelpers'
import './rangeInp.scss'

function RangeInp ({
  min, max, type = 'cost',
  children, value, setValue, percent,
  setFirstPay, price, loading
}) {
  const [local, setLocal] = useState(value)
  const [localPercent, setLocalPercent] = useState(percent)

  const inpRef = useRef(null)
  const icon = type === 'cost' ? '₽' : type === 'percent' ? `${localPercent}%` : 'мес.'
  const clazz = type === 'percent' ? 'range__icon range__icon-percent' : 'range__icon'

  const handleChange = (e) => {
    if (type === 'percent') {
      setFirstPay(e.target.value)
    } else {
      setValue(e.target.value)
    }
  }

  useEffect(() => {
    changeRangeBackground(inpRef)
    setLocal(mask(value))
    if (type === 'percent') {
      setLocalPercent(Math.round((value / price) * 100))
      changeRangeBackground(inpRef)
    }
  }, [value, percent, localPercent])

  const actualValue = type === 'percent' ? localPercent : value

  return (
    <div className='range' style={loading ? { opacity: '0.4' } : null}>
      {children}
        <input
          disabled={loading}
          className='range__input'
          onBlur={() => {
            if (type !== 'percent') { checkValues({ value, min, max }, setValue) } else {
              const min = price * 0.1
              const max = price * 0.6
              checkValues({ value, min, max }, setFirstPay)
            }
          }}
          onChange={(e) => {
            handleChange(validateNum(e))
          }} value={type === 'percent' ? local : local} />

        <div className={clazz}>{icon}</div>
        <input
          disabled={loading}
          className='range__inputRange'
          ref={inpRef} step={Math.round(min / 10)} onChange={(e) => {
            setValue(e.target.value)
            setLocalPercent(e.target.value)
          }} min={min} max={max} type='range' value={actualValue}/>
    </div>
  )
}

export default RangeInp
