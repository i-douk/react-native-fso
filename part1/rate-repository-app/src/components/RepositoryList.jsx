import React from 'react';
import { FlatList } from 'react-native';
import RepositoryItem , { ItemSeparator } from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  const { repositories } = useRepositories() 
  console.log(repositories) 
  // Get the nodes from the edges array
  const repositoryNodes = repositories && repositories.edges ?
   repositories.edges.map(edge => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;