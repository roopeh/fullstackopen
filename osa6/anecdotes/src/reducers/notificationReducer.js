import { createSlice } from "@reduxjs/toolkit"

var timeOut = null

const notificationSlice = createSlice({
  name: "notifications",
  initialState: "",
  reducers: {
    enable(state, action) {
      return action.payload
    },
    disable(state, action) {
      return null
    }
  }
})

export const createNotification = (text, time) => {
  return async dispatch => {
    dispatch(enable(text))

    if (timeOut !== null)
      clearTimeout(timeOut)

    timeOut = setTimeout(() => dispatch(disable("")), time * 1000)
  }
  
}

export const { enable, disable } = notificationSlice.actions
export default notificationSlice.reducer