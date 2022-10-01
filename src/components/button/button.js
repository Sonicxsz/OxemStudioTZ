import { useState } from 'react'
import './button.scss'
function Button () {
  const [active, setActive] = useState(false)
  return (
    <div className='button'>
        <button className='button__btn'>Оставить заявку</button>
    </div>
  )
}

export default Button
