import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateData } from '../redux/reducers/brainomix-data-reducer'

export const useFetch = (url) => {
  const [data, setData] = useState()
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch(url)
      .then((result) => {
        if (result.ok) {
          return result.json().then(handleOnDataFetched)
        }
        handleOnError(result.error)
      })
      .catch((err) => {
        handleOnError(err)
      })
  }, [url])

  const handleOnDataFetched = (rawData) => {
    dispatch(updateData(rawData.items))
    setIsLoading(false)
    setData(data)
  }

  const handleOnError = (err) => {
    setIsLoading(false)
    setHasError(true)
    console.error(err)
  }

  return [isLoading, hasError, data]
}
