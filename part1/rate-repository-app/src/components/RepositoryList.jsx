import React, { useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Text from './Text';
import { FlatList } from "react-native";
import RepositoryItem, { ItemSeparator } from "./RepositoryItem";
import { View } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
export const RepositoryListContainer = ({repositories}) => {
  return (
    <FlatList
    data={repositories}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({ item }) => <RepositoryItem item={item.node} />}
    keyExtractor={(item) => item.node.id}
  />
  )
};
const RepositoryList = () => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [menuTitle, setMenuTitle] = useState('Latest repositories')  
  const [orderDirection , setOrderDirection] = useState ('DESC');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderDirection: orderDirection, orderBy: orderBy }
  });
  console.log(result)
  if (result.loading) {
    return <Text>data loading...</Text>
  }
  const repositoryNodes = result.data.repositories.edges
  return (
    <PaperProvider>
    <View
      style={{
        paddingTop: 10,
        flexDirection: 'column',
      }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>{menuTitle}</Button>}>
        <Menu.Item title="Select an item"/> 
        <Divider />
        <Menu.Item onPress={() => {
          setMenuTitle("Latest repositories")
          setOrderDirection('DESC')
          setOrderBy('CREATED_AT')
        }} title="Latest repositories" />
        <Divider />
        <Menu.Item onPress={() => {
           setMenuTitle("Highest rated repositories")
           setOrderDirection('DESC')
           setOrderBy('RATING_AVERAGE')
        }} title="Highest rated repositories" />
        <Divider />
        <Menu.Item onPress={() => {
          setMenuTitle("Lowest rated repositories")
          setOrderDirection('ASC')
          setOrderBy('RATING_AVERAGE')
        }} title="Lowest rated repositories" />
      </Menu>
    <RepositoryListContainer repositories={repositoryNodes}/>
    </View>
  </PaperProvider>
);
};

export default RepositoryList;