import React from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Text from './Text';
import { FlatList } from "react-native";
import RepositoryItem, { ItemSeparator } from "./RepositoryItem";

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
  const result = useQuery(GET_REPOSITORIES ,
    { fetchPolicy: 'cache-and-network' }
  )
  if (result.loading) {
    return <Text>data loading...</Text>
  }
  const repositoryNodes = result.data.repositories.edges
  return (
    <RepositoryListContainer repositories={repositoryNodes}/>
  );
};

export default RepositoryList;