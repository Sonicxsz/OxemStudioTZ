import { useState } from 'react'

export const useLeasingService = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const request = async (url, method = 'GET', body = null, headers = { 'Content-type': 'application/json' }) => {
    setLoading(true)
    setError(false)
    try {
      const response = await fetch(url, { method, body, headers })
      if (!response.ok) {
        throw new Error(`Could not fets ${url}`)
      }
      const data = await response.json()
      setLoading(false)
      return data
    } catch (error) {
      setLoading(false)
      setError(true)
      throw error
    }
  }

  const sendData = async (url, data) => {
    const res = await request(url, 'POST', data)
  }

  return { sendData, loading, error }
}
