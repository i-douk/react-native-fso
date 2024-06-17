import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import Text from './Text';

const SingleRepositoryView = () => {
  const { repositoryId } = useParams();

  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId }
  });

  if (loading) {
    return <Text>Loading ...</Text>;
  }

  if (error) {
    return <Text>Error loading data.</Text>;
  }

  const repository = data?.repository;

  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} />
      <Pressable style={styles.button} onPress={() => window.open(repository.url)}>
        <Text fontWeight='bold' color='white'>Open in Github</Text>
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
