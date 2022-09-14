import { useParams } from "react-router-native"
import useRepository from "../hooks/useRepository"
import RepositoryItem from "./RepositoryItem"

const Repository = () => {
  const { id } = useParams()
  const data = useRepository(id)

  if (!data || data.loading) {
    return null
  }

  return <RepositoryItem content={data.repository} showButton />
}

export default Repository
