import React from 'react'
import { translate as _ } from '../../services/translations/translate'
import './error-page.scss'

// just a simple error page, if fetching goes wrong
export const ErrorPage = () => {
  return <div className="error-page">{_(['errorPage', 'errorInfoMessage'])}</div>
}
