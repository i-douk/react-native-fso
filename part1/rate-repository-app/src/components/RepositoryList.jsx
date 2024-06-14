import React from 'react';
import { FlatList } from 'react-native';
import RepositoryItem , { ItemSeparator } from './RepositoryItem';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Text from './Text';

const RepositoryList = () => {
  const result = useQuery(GET_REPOSITORIES ,
    { fetchPolicy: 'cache-and-network' }
  )
  if (result.loading) {
    return <Text>data loading...</Text>
  }
  const repositiriesNodes = result.data.repositories.edges
  return (
    <FlatList
      data={repositiriesNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item.node} />}
      keyExtractor={(item) => item.node.id}
    />
  );
};

export default RepositoryList;