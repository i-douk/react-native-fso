import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import Text from './Text';

const SingleRepositoryView = () => {

  const { repositoryId } = useParams();
  const { loading, data, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  if (loading) {
    return <Text>Data loading...</Text>;
  }

  if (error) {
    return <Text>Error loading data.</Text>;
  }
  const repositoryNodes = data.repositories.edges.map(edge => edge.node);
  const matchingRepo = repositoryNodes.find(repo => repo.id === repositoryId);
  console.log(matchingRepo)
  return (
    <View style={styles.container}>
      <RepositoryItem item={matchingRepo} />
      <Pressable style={styles.button} onPress={() => window.open(matchingRepo.url)}>
        <Text fontWeight='bold' color='white' >Open in Github</Text>
      </Pressable>
          
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    padding: 20,
    backgroundColor: '#0096FF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  }
});

export default SingleRepositoryView;
