import { createSlice } from '@reduxjs/toolkit'

export const localeReducer = createSlice({
  name: 'locale',
  initialState: {
    locale: 'en-150'
  },
  reducers: {
    setLocale: (state, action) => {
      console.log('reducer', action.payload)
      state.locale = action.payload
    }
  }
})

export const { setLocale } = localeReducer.actions
export default localeReducer.reducer
