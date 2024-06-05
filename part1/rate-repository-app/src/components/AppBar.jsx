import { View, StyleSheet, ScrollView } from 'react-native';
import AppBarTab from './AppBarTab';
import theme from '../theme';
const styles = StyleSheet.create({
  container: {
    backgroundColor :theme.colors.textPrimary,
    padding :20,
  },
  scroll: {
    flexDirection: 'row',
    gap : 10
  }
});

const AppBar = () => {
  return (
  <View style={styles.container}>
   <ScrollView horizontal contentContainerStyle={styles.scroll} >
     <AppBarTab tab='repositories' route='/' />
     <AppBarTab tab='Sign In' route='/signin' />
   </ScrollView>
  
  </View>
  );
};

export default AppBar