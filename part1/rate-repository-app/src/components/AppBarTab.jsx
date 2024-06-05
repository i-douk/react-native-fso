import { Pressable } from "react-native"
import { Link } from "react-router-native";
import Text from "./Text"

const AppBarTab = ({tab,route}) => {
  return (
    <Pressable  >
      <Link to={route}>
        <Text color='white' fontWeight='bold' fontSize='heading'>{tab}</Text>
      </Link>
   </Pressable>
  )
}

export default AppBarTab