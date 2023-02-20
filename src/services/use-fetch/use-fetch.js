import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateData, updateFilteredData } from '../redux/reducers/brainomix-data-reducer'
// import { generateDummyData } from '../generators/dummy-data-generator' // uncomment for having dummy data

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
    const items = rawData.items // comment for using dummy data
    // const items = generateDummyData(2000) // uncomment for having dummy data
    dispatch(updateData(items))
    dispatch(updateFilteredData(items))
    setIsLoading(false)
    setData(items)
  }

  const handleOnError = (err) => {
    setIsLoading(false)
    setHasError(true)
    console.error(err)
  }

  return [isLoading, hasError, data]
}
