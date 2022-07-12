import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { message: "", type: 0 },
  reducers: {
    enable(state, action) {
      return action.payload
    },
    disable() {
      return null
    },
  },
})

export const { enable, disable } = notificationSlice.actions

let timeOut = null

export const createNotification = (message, type) => async (dispatch) => {
  dispatch(enable({ message, type }))

  if (timeOut !== null) {
    clearTimeout(timeOut)
  }

  timeOut = setTimeout(() => dispatch(disable()), 3000)
}

export default notificationSlice.reducer
