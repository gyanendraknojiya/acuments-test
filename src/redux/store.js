import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'

import logger from 'redux-logger'

export const store = configureStore({
  reducer,
  devTools: true,
  // middleware: [ logger]
})