import React from 'react'
import './main-page.scss'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { translate as _ } from '../../services/translations/translate'
import { LinearProgress } from '@mui/material'

export const MainPage = ({ loading }) => {
  const data = useSelector((state) => state.brainomixData) ?? []
  console.log(data)

  const renderLoadingScreen = () => {
    return (
      <div className="main-page-loading">
        <div className="loading-content">
          <div className="loading-text">{`${_(['mainPage', 'dataLoading'])} . . .`}</div>
          <div className="progress">
            <LinearProgress />
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    // return <div className="main-page-content">{`Main Page`}</div>
    return <div className="main-page-content">{_(['mainPage', 'dataLoading'])}</div>
  }

  return <div className="main-page">{loading ? renderLoadingScreen() : renderContent()}</div>
  // return <div className="main-page">{renderLoadingScreen()}</div>
}

MainPage.propTypes = {
  loading: PropTypes.bool.isRequired
}
