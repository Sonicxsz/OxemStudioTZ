import './sum.scss'

function Sum ({ text, children }) {
  return (
    <div className='sum'>
        {children}
        <p className='sum__title'>
            {text} ₽
        </p>
    </div>
  )
}

export default Sum
