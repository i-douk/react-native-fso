import { Pressable } from "react-native"
import Text from "./Text"

const AppBarTab = ({tab}) => {
  return (
    <Pressable >
     <Text color='white' fontWeight='bold' fontSize='heading'>{tab}</Text>
   </Pressable>
  )
}

export default AppBarTab