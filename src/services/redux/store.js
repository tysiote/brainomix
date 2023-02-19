import { configureStore } from '@reduxjs/toolkit'
import brainomixDataReducer from './reducers/brainomix-data-reducer'
import localeReducer from './reducers/locale-reducer'

export const store = configureStore({
  reducer: {
    brainomixData: brainomixDataReducer,
    locale: localeReducer
  }
})
