import './button.scss'

import { ReactComponent as Spinner } from './spinner.svg'
function Button ({ loading, send }) {
  return (
    <div className='button'>
        <button onClick={() => send()} disabled={loading} className='button__btn'>{loading ? <Spinner /> : 'Оставить заявку' }</button>
    </div>
  )
}

export default Button
