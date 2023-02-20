import PropTypes from 'prop-types'
import { translate as _ } from '../../services/translations/translate'
import { patientStateShape } from './shapes'
import { getDate, translateGender, translateState } from './utils'
import './patient-card.scss'
import { Button } from '@mui/material'

// PatientCard works on two levels;
// 1. A replacement for a table row (main usage)
// 2. A detailed view (`extended`) of a chosen item/patient - doesn't matter, if the patient was chosen using a table or card grid
// If any information (additional or basic) is missing, it's simply not shown;
// - this should correspond to the manual, in which `gender`, `patientId`,`name`, `dateOfBirth` might be missing
// Anything besides `id` (not `patientId`) can be missing actually, it still should work

export const PatientCard = ({
  onClick,
  id,
  patientId,
  name,
  dateOfBirth,
  timestamp,
  state,
  locale,
  extended,
  selected,
  gender,
  studyDescription,
  seriesDescription,
  sliceThickness,
  scannerManufacturer,
  scannerModel,
  thumbnail,
  url,
  indexInList
}) => {
  const handleOnCardClick = (close) => {
    if (!extended) {
      onClick(id)
    } else if (close) {
      onClick()
    }
  }

  const renderExtendedDetails = () => {
    return (
      <>
        {gender && (
          <div className="patient-gender">
            <span>{`${_(['patient', 'patientGender'])}: `}</span>
            {_(['patient', translateGender(gender)])}
          </div>
        )}
        {scannerManufacturer && (
          <div className="patient-scanner-manufacturer">
            <span>{`${_(['patient', 'patientScannerManufacturer'])}: `}</span>
            {scannerManufacturer}
          </div>
        )}
        {scannerModel && (
          <div className="patient-scanner-model">
            <span>{`${_(['patient', 'patientScannerModel'])}: `}</span>
            {scannerModel}
          </div>
        )}
        {sliceThickness && (
          <div className="patient-slice-thickness">
            <span>{`${_(['patient', 'patientSliceThickness'])}: `}</span>
            {`${sliceThickness} mm`}
          </div>
        )}
        {studyDescription && (
          <div className="patient-study-description">
            <span>{`${_(['patient', 'patientStudyDescription'])}: `}</span>
            {studyDescription}
          </div>
        )}
        {seriesDescription && (
          <div className="patient-series-description">
            <span>{`${_(['patient', 'patientSeriesDescription'])}: `}</span>
            {seriesDescription}
          </div>
        )}
        {thumbnail && (
          <div className="patient-thumbnail">
            <img src={thumbnail} alt="patient-thumbnail" />
          </div>
        )}
        {url && (
          <div className="patient-url">
            <a href={url} target="_blank" rel="noreferrer">
              {_(['patient', 'patientUrl'])}
            </a>
          </div>
        )}
        <div className="patient-close-card">
          <Button onClick={() => handleOnCardClick(true)}>
            {_(['patient', 'closePatientLabel'])}
          </Button>
        </div>
      </>
    )
  }

  let patientClassName = 'patient-card'

  if (selected && !extended) {
    patientClassName = `${patientClassName} selected`
  }

  if (extended) {
    patientClassName = `${patientClassName} extended`
  }

  return (
    <div className={patientClassName} onClick={() => handleOnCardClick()}>
      {indexInList && (
        <div className="patient-index">
          <span>{`#${indexInList}`}</span>
        </div>
      )}
      {patientId && (
        <div className="patient-id">
          <span>{`${_(['patient', 'patientId'])}: `}</span>
          {patientId}
        </div>
      )}
      {name && (
        <div className="patient-name">
          <span>{`${_(['patient', 'patientName'])}: `}</span>
          {name}
        </div>
      )}
      {dateOfBirth && (
        <div className="patient-date">
          <span>{`${_(['patient', 'patientDateOfBirth'])}: `}</span>
          {getDate(dateOfBirth, locale)}
        </div>
      )}
      {timestamp && (
        <div className="timestamp">
          <span>{`${_(['patient', 'patientTimestamp'])}: `}</span>
          {getDate(timestamp, locale)}
        </div>
      )}
      {state && (
        <div className="patient-state">
          <span>{`${_(['patient', 'patientState'])}: `}</span>
          {_(['patient', translateState(state)])}
        </div>
      )}
      {extended && renderExtendedDetails()}
    </div>
  )
}

PatientCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired,
  state: patientStateShape.isRequired,
  id: PropTypes.number.isRequired,
  locale: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  indexInList: PropTypes.number,
  extended: PropTypes.bool,
  patientId: PropTypes.string,
  name: PropTypes.string,
  dateOfBirth: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  gender: PropTypes.string,
  studyDescription: PropTypes.string,
  seriesDescription: PropTypes.string,
  sliceThickness: PropTypes.number,
  scannerManufacturer: PropTypes.string,
  scannerModel: PropTypes.string,
  thumbnail: PropTypes.string,
  url: PropTypes.string
}

PatientCard.defaultProps = {
  indexInList: null,
  extended: false,
  patientId: null,
  name: null,
  dateOfBirth: null,
  gender: null,
  studyDescription: null,
  seriesDescription: null,
  sliceThickness: null,
  scannerManufacturer: null,
  scannerModel: null,
  thumbnail: null,
  url: null
}
