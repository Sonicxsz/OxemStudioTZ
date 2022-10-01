import './App.scss'
import About from './components/about/about'
import Button from './components/button/button'
import RangeInp from './components/rangeInp/rangeInp'
import Sum from './components/sum/sum'
import Title from './components/title/title'
function App () {
  return (
    <div className="container">
      <div className='flex'>
      <About/>
      </div>
      <div className='flex'>
      <RangeInp min={1000000} max={6000000} type='cost'>
        <Title text={'Стоимость автомобиля'}/>
        </RangeInp>
      <RangeInp min={100000} max={400000} type='percent' >
        <Title text={'Первоначальный взнос'} />

      </RangeInp>
      <RangeInp min={1} max={60} type='month'>
        <Title text={'Срок лизинга'} />
      </RangeInp>
      </div>
      <div className='flex'>
      <div className='flex__sum'>
        <Sum text={'4 467 313'}>
          <Title text={'Сумма договора лизинга'}/>
        </Sum>
        <Sum text={'114 455'}>
          <Title text={'Ежемесячный платеж от'}/>
        </Sum>
      </div>
      <Button />
      </div>

    </div>
  )
}

export default App
