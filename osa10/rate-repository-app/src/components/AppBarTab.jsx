import { Pressable } from 'react-native'
import Text from './Text'

const AppBarText = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress}>
        <Text color="textSecondary" bolded>{text}</Text>
      </Pressable>
  )
}

export default AppBarText
