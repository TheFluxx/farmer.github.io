import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  active: 'home',
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.active = action.payload
    }
  },
})

export const { editActive } = navigationSlice.actions

export default navigationSlice.reducer