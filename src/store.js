import { configureStore } from '@reduxjs/toolkit'
import navigationSlice from './store/slices/navigationSlice'
import coinSlice from './store/slices/coinSlice'
import tasksSlice from './store/slices/tasksSlice'

export const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    coin: coinSlice,
    tasks: tasksSlice
  },
})