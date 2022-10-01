import { useEffect, useState, useRef } from 'react'
import { changeRangeBackground, checkValues, validateNum, mask } from '../../utils/valueHelpers'
import './rangeInp.scss'

function RangeInp ({ min, max, type = 'cost', children }) {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState(min)
  const [unmasked, setUnMasked] = useState(min)
  const [percent, setPercent] = useState(null)
  const inpRef = useRef(null)
  const icon = type === 'cost' ? '₽' : type === 'percent' ? `${percent}%` : 'мес.'
  const clazz = type === 'percent' ? 'range__icon range__icon-percent' : 'range__icon'

  const handleChange = (e) => {
    setValue(mask(e.target.value))
    setUnMasked(e.target.value)
  }

  useEffect(() => {
    setPercent(changeRangeBackground(inpRef))
  }, [value])

  return (
    <div className='range' style={active ? { opacity: '0.4' } : null}>
      {children}
        <input
          disabled={active}
          className='range__input'
          onBlur={() => {
            checkValues({ value, min, max }, setValue)
          }}
          onChange={(e) => {
            handleChange(validateNum(e))
          }} value={value} />
        <div className={clazz}>{icon}</div>
        <input
          disabled={active}
          className='range__inputRange'
          ref={inpRef} step={Math.round(min / 10)} onChange={(e) => {
            handleChange(e)
          }} min={min} max={max} type='range' value={unmasked}/>
    </div>
  )
}

export default RangeInp
