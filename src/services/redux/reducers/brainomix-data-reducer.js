import { createSlice } from '@reduxjs/toolkit'

export const brainomixDataReducer = createSlice({
  name: 'brainomix-data',
  initialState: {
    data: [],
    filteredData: []
  },
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload
    },
    updateFilteredData: (state, action) => {
      state.filteredData = action.payload
    }
  }
})

export const { updateData, updateFilteredData } = brainomixDataReducer.actions
export default brainomixDataReducer.reducer
