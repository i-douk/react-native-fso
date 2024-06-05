import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
const styles = StyleSheet.create({
  container: {
    backgroundColor :theme.colors.textPrimary,
    padding :20,
    flexDirection : 'row',
    justifyContent: 'space-around'
  },
});

const AppBar = () => {
  return <View style={styles.container}>
   <AppBarTab tab='repositories' route='/' />
   <AppBarTab tab='signIn' route='/signin' />
  </View>
};

export default AppBar