import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { translate as _ } from '../../services/translations/translate'
import './pagination.scss'
import { IconButton, MenuItem, Select } from '@mui/material'
import { getDisabledButtons, getShowingItemsIndices } from './utils'
import LastPageIcon from '@mui/icons-material/LastPage'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

const ITEMS_PER_PAGE_VALUES = [0, 10, 25, 50, 100] // 0 means all items are displayed

// Pagination is a `dummy` component, that only process numbers (not any data).
// It requires the given count and responds to user actions - triggers given `onChange` handler

export const Pagination = ({ count, onChange }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [itemIndices, setItemIndices] = useState(
    getShowingItemsIndices({ count, itemsPerPage, currentPage })
  )
  const [buttonsDisabled, setButtonsDisabled] = useState(
    getDisabledButtons({ count, itemsPerPage, currentPage })
  )

  // this actually is triggered more than once (initial fetch), because everytime searchField is used, the `filteredData` count changes
  useEffect(() => {
    const indices = getShowingItemsIndices({
      count,
      itemsPerPage,
      currentPage: 0
    })

    setCurrentPage(0)
    setItemIndices(indices)
    setButtonsDisabled(getDisabledButtons({ count, itemsPerPage, currentPage: 0 }))

    onChange(indices)
  }, [count])

  const handleOnPageClick = ({ increment = 0, max = false, min = false }) => {
    let newValue = currentPage
    if (max) {
      newValue = Math.ceil(count / itemsPerPage) - 1
    }

    if (min) {
      newValue = 0
    }

    if (increment) {
      newValue = currentPage + increment
    }

    const indices = getShowingItemsIndices({
      count,
      itemsPerPage,
      currentPage: newValue
    })

    setCurrentPage(newValue)
    setItemIndices(indices)
    setButtonsDisabled(getDisabledButtons({ count, itemsPerPage, currentPage: newValue }))

    onChange(indices)
  }

  const handleOnItemPerPageChange = (event) => {
    const newValue = event.target.value
    setItemsPerPage(newValue)
    setCurrentPage(0)
    const indices = getShowingItemsIndices({
      count,
      itemsPerPage: newValue,
      currentPage: 0
    })
    setItemIndices(indices)
    setItemsPerPage(newValue)
    setButtonsDisabled(getDisabledButtons({ count, itemsPerPage: newValue, currentPage: 0 }))

    onChange(indices)
  }

  const renderItemsPerPage = () => {
    return (
      <div className="items-per-page">
        <Select value={itemsPerPage} onChange={handleOnItemPerPageChange}>
          {ITEMS_PER_PAGE_VALUES.map((item) => (
            <MenuItem key={`items-per-page-${item}`} value={item} className="items-per-page-item">
              {/* If item === 0 => it should translate to `All` */}
              {item || _(['pagination', 'allPatients'])}{' '}
            </MenuItem>
          ))}
        </Select>
      </div>
    )
  }

  const renderPageNumber = () => {
    const showingPatients = _(['pagination', 'showingPatients'])
    const startingIndex = count ? itemIndices[0] : 0
    const endingIndex = itemIndices[1]
    const of = _(['pagination', 'showingPatientsOf'])
    return (
      <div className="showing-patients-label">{`${showingPatients} ${startingIndex} - ${endingIndex} ${of} ${count}`}</div>
    )
  }

  const renderPageSelection = () => {
    return (
      <div className="page-selection">
        <IconButton disabled={buttonsDisabled.min} onClick={() => handleOnPageClick({ min: true })}>
          <FirstPageIcon />
        </IconButton>
        <IconButton
          disabled={buttonsDisabled.previous}
          onClick={() => handleOnPageClick({ increment: -1 })}>
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          disabled={buttonsDisabled.next}
          onClick={() => handleOnPageClick({ increment: 1 })}>
          <KeyboardArrowRight />
        </IconButton>
        <IconButton disabled={buttonsDisabled.max} onClick={() => handleOnPageClick({ max: true })}>
          <LastPageIcon />
        </IconButton>
      </div>
    )
  }

  return (
    <div className="pagination">
      {renderItemsPerPage()}
      {renderPageNumber()}
      {renderPageSelection()}
    </div>
  )
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}
