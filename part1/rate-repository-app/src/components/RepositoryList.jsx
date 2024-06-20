import React, { useState, useCallback } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Text from './Text';
import { FlatList, View } from 'react-native';
import RepositoryItem, { ItemSeparator } from "./RepositoryItem";
import { Button, Menu, Divider, PaperProvider, Searchbar, MD2LightTheme as DefaultTheme } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    secondary: 'gray',
  },
};

export const RepositoryListContainer = ({ repositories }) => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item.node} />}
      keyExtractor={(item) => item.node.id}
    />
  );
};

const RepositoryList = () => {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const openMenu = useCallback(() => setVisible(true), []);
  const closeMenu = useCallback(() => setVisible(false), []);
  const [menuTitle, setMenuTitle] = useState('Latest repositories');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  // FETCHING REPOS //
  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderDirection, orderBy, searchKeyword: debouncedSearchQuery }
  });

  const repositoryNodes = result.loading ? [] : result.data.repositories.edges;

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: '#F2F2F2'
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>{menuTitle}</Button>}>
          <Menu.Item title="Select an item" />
          <Divider />
          <Menu.Item onPress={() => {
            setMenuTitle("Latest repositories");
            setOrderDirection('DESC');
            setOrderBy('CREATED_AT');
            closeMenu();
          }} title="Latest repositories" />
          <Divider />
          <Menu.Item onPress={() => {
            setMenuTitle("Highest rated repositories");
            setOrderDirection('DESC');
            setOrderBy('RATING_AVERAGE');
            closeMenu();
          }} title="Highest rated repositories" />
          <Divider />
          <Menu.Item onPress={() => {
            setMenuTitle("Lowest rated repositories");
            setOrderDirection('ASC');
            setOrderBy('RATING_AVERAGE');
            closeMenu();
          }} title="Lowest rated repositories" />
        </Menu>
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearchChange}
          value={searchQuery}
        />
        {result.loading ? <Text>Data loading...</Text> : <RepositoryListContainer repositories={repositoryNodes} />}
      </View>
    </PaperProvider>
  );
};

export default RepositoryList;
