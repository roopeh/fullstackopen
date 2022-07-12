import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notificatonReducer"
import userReducer from "./reducers/userReducer"
import usersReducer from "./reducers/usersReducer"

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
