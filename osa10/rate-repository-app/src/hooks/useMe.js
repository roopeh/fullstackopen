import { useQuery } from "@apollo/client"
import { ME } from "../graphql/queries"

const useMe = () => {
  const { data, error, loading } = useQuery(ME)

  const me = data && data.me ? data.me : []

  return { me, error, loading }
}

export default useMe
