import { useState, useEffect } from 'react'
import { mask } from './utils/valueHelpers'
import { useLeasingService } from './service/server'
import About from './components/about/about'
import Button from './components/button/button'
import RangeInp from './components/rangeInp/rangeInp'
import Sum from './components/sum/sum'
import Title from './components/title/title'
import './App.scss'

function App () {
  const [cost, setCost] = useState(1000000) // стоимость машины
  const [percent, setPercent] = useState(10) // процент взноса
  const [month, setMonth] = useState(1) // колл месяцев
  const [firstPay, setFirstPay] = useState(0) // первоначальный взнос
  const [monthPay, setMonthPay] = useState(0) // ежемесячный платеж
  const [fullPrice, setFullPrice] = useState(0) // полная стоимость

  const { sendData, loading } = useLeasingService()

  const calcSumofCar = () => {
    const monthPay = Math.round((cost - firstPay) * ((0.035 * Math.pow((1 + 0.035), month)) / (Math.pow((1 + 0.035), month) - 1)))
    const fullSum = Math.round(+firstPay + (month * monthPay))
    setMonthPay(monthPay)
    setFullPrice(fullSum)
  }

  const sendDataFunc = () => {
    const obj = JSON.stringify({
      cost,
      firstPay,
      month,
      monthPay,
      fullPrice,
      percent
    })
    sendData('https://eoj3r7f3r4ef6v4.m.pipedream.net', obj)
  }

  useEffect(() => {
    calcSumofCar()
  }, [cost, month, firstPay])

  useEffect(() => {
    const firstP = Math.round((percent / 100) * cost)
    setFirstPay(firstP)
  }, [percent, cost])

  return (
    <div className="container">
      <div className='flex'>
      <About/>
      </div>
      <div className='flex'>
      <RangeInp
        loading={loading}
        min={1000000}
        max={6000000}
        type='cost'
        value={cost}
        setValue={setCost}>
        <Title text={'Стоимость автомобиля'}/>
        </RangeInp>
      <RangeInp min={10} max={60} type='percent'
        loading={loading}
        percent={percent}
        setFirstPay={setFirstPay}
        value={firstPay}
        setValue={setPercent}
        price={cost}
        setPercent={setPercent}>
        <Title text={'Первоначальный взнос'} />

      </RangeInp>
      <RangeInp
        loading={loading}
        min={1}
        max={60}
        type='month'
        value={month}
        setValue={setMonth}>
        <Title text={'Срок лизинга'} />
      </RangeInp>
      </div>
      <div className='flex'>
      <div className='flex__sum'>
        <Sum text={mask(fullPrice)}>
          <Title text={'Сумма договора лизинга'}/>
        </Sum>
        <Sum text={mask(monthPay)}>
          <Title text={'Ежемесячный платеж от'}/>
        </Sum>
      </div>
      <Button send={sendDataFunc} loading={loading} />
      </div>

    </div>
  )
}

export default App
