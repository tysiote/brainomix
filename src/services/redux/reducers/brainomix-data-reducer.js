import { createSlice } from '@reduxjs/toolkit'

export const brainomixDataReducer = createSlice({
  name: 'brainomix-data',
  initialState: {
    data: []
  },
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { updateData } = brainomixDataReducer.actions
export default brainomixDataReducer.reducer
