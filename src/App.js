import { ErrorPage, MainPage } from './pages'
import './constants.scss'
import { useFetch } from './services/use-fetch'
import { Navbar } from './components'

const URL = process.env.REACT_APP_DATA_SOURCE
// const URL = 'https://error-url'

export const App = () => {
  const [isLoading, hasError] = useFetch(URL) // custom hook, where the fetch logic is ... also saves data to redux

  // we can also use (set up) React Router for that
  const renderCorrectPage = () => {
    return <MainPage loading={isLoading} />
  }

  return (
    <div className="App">
      <Navbar />
      {hasError ? <ErrorPage /> : renderCorrectPage()}
    </div>
  )
}
