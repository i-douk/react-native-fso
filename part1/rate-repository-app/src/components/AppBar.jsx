import { View, StyleSheet, ScrollView } from 'react-native';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    backgroundColor :theme.colors.textPrimary,
    padding : 20,
  },
  scroll: {
    flexDirection: 'row',
    gap : 10,
  }
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const accessToken = authStorage.getAccessToken()
  const result = useQuery(ME , { 
    headers : { 
      Authorization : `Bearer ${accessToken}`
    }
  })
  console.log(result.data)
  return (
  <View style={styles.container}>
   <ScrollView horizontal contentContainerStyle={styles.scroll} >
     <AppBarTab tab='Repositories' route='/' />
     { result.data && <AppBarTab tab='Sign Out' route='/signout' />}
     { !result.data && <AppBarTab tab='Sign In' route='/signin' />}
   </ScrollView>
  </View>
  );
};

export default AppBar;