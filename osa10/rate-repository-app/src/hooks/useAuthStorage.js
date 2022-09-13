import { useContext } from "react"
import AuthStorageContext from "../context/AuthStorageContext"

const useAuthStorage = () => useContext(AuthStorageContext)

export default useAuthStorage
