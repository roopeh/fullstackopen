import { Text } from 'react-native'

const RepositoryItem = ({ content }) => {
  return (
      <Text>
        Full name: {content.fullName}<br />
        Description: {content.description}<br />
        Language: {content.language}<br />
        Stars: {content.stargazersCount}<br />
        Forks: {content.forksCount}<br />
        Reviews: {content.reviewCount}<br />
        Rating: {content.ratingAverage}<br />
      </Text>
  )
}

export default RepositoryItem
