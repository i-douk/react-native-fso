import { View, StyleSheet, ScrollView } from 'react-native';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import Text from './Text';

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
  const accessToken = authStorage.getAccessToken().catch(e=>console.log(e))

  const result = useQuery( ME , { 
    headers : { 
      Authorization : `Bearer ${accessToken}`
    }
  })
  if(result.loading) {
    return <Text>connecting</Text>
  }

  return (
  <View style={styles.container}>
   <ScrollView horizontal contentContainerStyle={styles.scroll} >
     <AppBarTab tab='Repositories' route='/' />
     <AppBarTab tab='Create a review' route='/create-review' />
     {result.data.me===null ? 
      <AppBarTab tab='Sign In' route='/signin' /> 
      :
      <AppBarTab tab='Sign out' route='/signout' />}
   </ScrollView>
  </View>
  );
};

export default AppBar;