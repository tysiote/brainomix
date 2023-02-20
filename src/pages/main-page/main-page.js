import React, { useEffect, useState } from 'react'
import './main-page.scss'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { translate as _ } from '../../services/translations/translate'
import {
  FormControlLabel,
  FormGroup,
  LinearProgress,
  MenuItem,
  Select,
  Switch,
  TextField
} from '@mui/material'
import { Pagination, PatientCard } from '../../components'
import { filterPatientsByKeyword, getPatientById, sortPatientsByAttribute } from './utils'
import { Table } from '../../components'
import { sortByValues } from './constants'
import { updateFilteredData } from '../../services/redux/reducers/brainomix-data-reducer'

export const MainPage = ({ loading }) => {
  const [cardView, setCardView] = useState(true)
  const [detailsId, setDetailsId] = useState(null)
  const [denseView, setDenseView] = useState(false)
  const [sortBy, setSortBy] = useState(sortByValues.PATIENT_ID)
  const [sortByAsc, setSortByAsc] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [currentIndices, setCurrentIndices] = useState([0, 0])
  const [debounceTimer, setDebounceTimer] = useState(null)

  // we use redux for storing locale (language) and data/filteredData
  const dispatch = useDispatch()
  // filteredData basically is normal (fetched/generated) data that are being sorted
  const filteredData = useSelector((state) => state.brainomixData.filteredData)
  // data is fetched/generated data that are being filtered by searchField
  const data = useSelector((state) => state.brainomixData.data)
  const locale = useSelector((state) => state.locale.locale)

  // Translations are basically hooks, since they require locale.
  // Not every translation gets rendered each time, therefore we need to set them up here,
  // otherwise we use them not in the first level - which is antipattern and potentially buggy
  const _dataLoading = _(['mainPage', 'dataLoading'])
  const _cardView = _(['mainPage', 'cardView'])
  const _denseView = _(['mainPage', 'denseView'])
  const _sortBy = _(['mainPage', 'sortByLabel'])
  const _sortByAsc = _(['mainPage', 'sortByAscLabel'])
  const _search = _(['mainPage', 'search'])
  const _sortById = _(['mainPage', 'sortByIdLabel'])
  const _sortByName = _(['mainPage', 'sortByNameLabel'])
  const _sortByState = _(['mainPage', 'sortByStateLabel'])

  // set up filters/sorting when new data is loaded
  useEffect(() => {
    const sortedPatientList = sortPatientsByAttribute(filteredData, sortBy, sortByAsc)
    dispatch(updateFilteredData(sortedPatientList))
  }, [loading])

  const handleOnPaginationChange = ([startingIndex, endingIndex]) => {
    setCurrentIndices([startingIndex - 1, endingIndex])
  }

  const handleOnSortByAscSwitchChange = () => {
    const newValue = !sortByAsc
    const sortedPatientList = sortPatientsByAttribute(filteredData, sortBy, newValue)
    dispatch(updateFilteredData(sortedPatientList))
    setSortByAsc(newValue)
  }

  const handleOnCardViewSwitchChange = () => {
    setCardView(!cardView)
    setDetailsId(null)
  }

  const handleOnDenseViewSwitchChange = () => {
    setDenseView(!denseView)
  }

  const handleOnPatientClick = (id) => {
    setDetailsId(detailsId === id || !id ? null : id)
  }

  const handleOnSearchValueChange = (event) => {
    const newValue = event.target.value
    setSearchValue(newValue)

    clearTimeout(debounceTimer)

    // filtering in thousands of items might be a heavy operation, therefore we debounce this
    setDebounceTimer(
      setTimeout(() => {
        const newData = newValue?.length
          ? filterPatientsByKeyword(data, newValue.toLowerCase())
          : data
        const filteredNewData = sortPatientsByAttribute(newData, sortBy, sortByAsc)
        dispatch(updateFilteredData(filteredNewData))
      }, 500)
    )
  }

  const handleOnSortByChange = (newValue) => {
    const sortedPatientList = sortPatientsByAttribute(filteredData, newValue, sortByAsc)
    dispatch(updateFilteredData(sortedPatientList))

    setSortBy(newValue)
  }

  const renderLoadingScreen = () => {
    return (
      <div className="main-page-loading">
        <div className="loading-content">
          <div className="loading-text">{`${_dataLoading} . . .`}</div>
          <div className="progress">
            <LinearProgress />
          </div>
        </div>
      </div>
    )
  }

  const renderControls = () => {
    return (
      <div className="patients-controls">
        <FormGroup className="sort-by-select">
          <FormControlLabel
            control={
              <Select value={sortBy} onChange={(event) => handleOnSortByChange(event.target.value)}>
                <MenuItem value={sortByValues.PATIENT_ID}>{_sortById}</MenuItem>
                <MenuItem value={sortByValues.NAME}>{_sortByName}</MenuItem>
                <MenuItem value={sortByValues.STATE}>{_sortByState}</MenuItem>
              </Select>
            }
            label={_sortBy}
            labelPlacement="start"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={sortByAsc} onChange={handleOnSortByAscSwitchChange} />}
            label={_sortByAsc}
            labelPlacement="start"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={cardView} onChange={handleOnCardViewSwitchChange} />}
            label={_cardView}
            labelPlacement="start"
          />
        </FormGroup>
        <FormGroup style={{ visibility: cardView ? 'hidden' : 'visible' }}>
          <FormControlLabel
            control={<Switch checked={denseView} onChange={handleOnDenseViewSwitchChange} />}
            label={_denseView}
            labelPlacement="start"
          />
        </FormGroup>
        <TextField
          label={_search}
          variant="standard"
          value={searchValue}
          onChange={handleOnSearchValueChange}
        />
      </div>
    )
  }

  // we either render data in Cards or in Table
  const renderCards = () => {
    return (
      <div className="patient-cards">
        {filteredData.map((patient, idx) =>
          idx >= currentIndices[0] && idx < currentIndices[1]
            ? renderPatientCard(patient, idx + 1)
            : null
        )}
      </div>
    )
  }

  // this also is being used while showing additional data about the chosen patient/item - doesn't matter, whether the view is table or card
  const renderPatientCard = (patient, idx, extended) => {
    const {
      timestamp,
      state,
      id,
      patient_dob: dateOfBirth,
      patient_gender: gender,
      patient_id: patientId,
      patient_name: name,
      scanner_manufacturer: scannerManufacturer,
      scanner_model: scannerModel,
      series_description: seriesDescription,
      slice_thickness: sliceThickness,
      study_description: studyDescription,
      thumbnail,
      url
    } = patient

    return (
      <PatientCard
        locale={locale}
        onClick={handleOnPatientClick}
        id={id}
        name={name}
        patientId={patientId}
        state={state}
        dateOfBirth={dateOfBirth}
        key={`patient-card-${id}-${timestamp}`}
        timestamp={timestamp}
        gender={gender}
        extended={extended}
        selected={detailsId === id}
        scannerManufacturer={scannerManufacturer}
        scannerModel={scannerModel}
        seriesDescription={seriesDescription}
        sliceThickness={sliceThickness}
        studyDescription={studyDescription}
        thumbnail={thumbnail}
        url={url}
        indexInList={idx}
      />
    )
  }

  // we either render data in Cards or in Table
  const renderTable = () => {
    return (
      <div>
        <Table dense={denseView} onClick={handleOnPatientClick} indices={currentIndices} />
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className="main-page-content">
        {renderControls()}
        <div className="patient-list">
          <div className="list-and-wrapper">
            {cardView && renderCards()}
            {!cardView && renderTable()}
            <div className="pagination-wrapper">
              {<Pagination count={filteredData.length} onChange={handleOnPaginationChange} />}
            </div>
          </div>
          <div className="patient-details">
            {detailsId && renderPatientCard(getPatientById(filteredData, detailsId), null, true)}
          </div>
        </div>
      </div>
    )
  }

  return <div className="main-page">{loading ? renderLoadingScreen() : renderContent()}</div>
}

MainPage.propTypes = {
  loading: PropTypes.bool.isRequired
}
