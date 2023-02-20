import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { translate as _ } from '../../services/translations/translate'
import { getDate } from '../patient-card/utils'
import './table.scss'

// Table component displays the `itemsPerPage` number of filteredData
// Table can have dense or normal view and responds to <tr /> click
// Pagination is not part of a table

export const Table = ({ dense, onClick, indices }) => {
  const filteredData = useSelector((state) => state.brainomixData.filteredData)
  const locale = useSelector((state) => state.locale.locale)
  const _state = {
    ready: _(['patient', 'patientStateReady']),
    failed: _(['patient', 'patientStateFailed']),
    waiting: _(['patient', 'patientStateWaiting'])
  }

  const handleOnClick = (patientId) => {
    onClick(patientId)
  }

  const renderHead = () => {
    return (
      <thead>
        <tr>
          <th>#</th>
          <th>{_(['patient', 'patientId'])}</th>
          <th>{_(['patient', 'patientName'])}</th>
          <th>{_(['patient', 'patientDateOfBirth'])}</th>
          <th>{_(['patient', 'patientTimestamp'])}</th>
          <th>{_(['patient', 'patientState'])}</th>
        </tr>
      </thead>
    )
  }

  const renderBody = () => {
    return (
      <tbody>
        {filteredData.map((patient, idx) => {
          if (indices[0] > idx || idx >= indices[1]) {
            return null
          }

          const {
            id,
            patient_id: patientId,
            patient_name: name,
            patient_dob: dateOfBirth,
            timestamp,
            state
          } = patient

          return (
            <tr key={`tr-patient-${id}`} onClick={() => handleOnClick(id)}>
              <td>{idx + 1}</td>
              <td>{patientId ?? ''}</td>
              <td>{name ?? ''}</td>
              <td>{dateOfBirth ? getDate(dateOfBirth, locale) : ''}</td>
              <td>{timestamp ? getDate(timestamp, locale) : ''}</td>
              <td>{state ? _state[state] : ''}</td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  return (
    <div className={`patients-table ${dense ? 'dense' : ''}`}>
      <table>
        {renderHead()}
        {renderBody()}
      </table>
    </div>
  )
}

Table.propTypes = {
  dense: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  indices: PropTypes.arrayOf(PropTypes.number).isRequired
}
