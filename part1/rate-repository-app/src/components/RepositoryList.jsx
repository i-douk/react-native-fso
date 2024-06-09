import React from 'react';
import { FlatList } from 'react-native';
import RepositoryItem , { ItemSeparator } from './RepositoryItem';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const RepositoryList = () => {
  const result = useQuery(GET_REPOSITORIES ,
    {
      fetchPolicy: 'cache-and-network',
    }
  )
  if (result.loading) {
    return <div> data loading...</div>
  }
  const repositiriesNodes = result.data.repositories.edges
  return (
    <FlatList
      data={repositiriesNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item.node} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;