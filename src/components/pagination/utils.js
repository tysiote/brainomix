// decides which buttons are disabled. The decision is made by the current numbers of `count`, `currentPage` and `itemsPerPage`
export const getDisabledButtons = ({ count, currentPage, itemsPerPage }) => {
  if (!itemsPerPage) {
    // all items are displayed
    return { min: true, previous: true, next: true, max: true }
  }

  return {
    min: currentPage === 0,
    previous: currentPage === 0,
    next: currentPage + 1 === Math.ceil(count / itemsPerPage),
    max: currentPage + 1 === Math.ceil(count / itemsPerPage)
  }
}

// this is not only for pagination, but also is basically used in `onChange` to be passed back to `MainPage`
export const getShowingItemsIndices = ({ count, currentPage, itemsPerPage }) => {
  if (!itemsPerPage) {
    // all items are displayed
    return [1, count]
  }

  const startingItem = currentPage * itemsPerPage + 1
  const endingItem =
    (currentPage + 1) * itemsPerPage > count ? count : (currentPage + 1) * itemsPerPage
  return [startingItem, endingItem]
}
