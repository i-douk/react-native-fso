import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import Text from './Text';
import { FlatList } from 'react-native';
import { ItemSeparator } from './RepositoryItem';
import { format } from 'date-fns';
import theme from '../theme';
const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.container}>
        <RepositoryItem item={repository} />
        <Pressable style={styles.button} onPress={() => window.open(repository.url)}>
          <Text fontWeight='bold' color='white'>Open in Github</Text>
        </Pressable>
      </View>
    );
};
        
const ReviewItem = ({ review }) => {
    return (
      <View style={styles.reviewContainer}>
        <View style={styles.reviewRating}>
          <Text color='primary' fontWeight ='bold'>{review.rating}</Text>
        </View>
        <View>
          <Text fontWeight = 'bold'>{review.user.username}</Text>
          <Text color = 'textSecondary'>{format(review.createdAt, "MM/dd/yyyy")}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    )
  };
  
  const SingleRepository = () => {
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
    const reviews = repository.reviews.edges.map(review =>review.node)
    console.log(reviews)
    return (
      <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      />
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
        },
        reviewContainer : {
          flex: 1,
          padding: 20,
          flexDirection: 'row',
          gap: 10
        },
        reviewRating : {
          borderColor: theme.colors.primary,
          borderWidth: 2,
          borderRadius: 50,
          padding: 20,
          color: 'black',
          height: 70,
          width: 70,
          textAlign: 'center',
        },
        reviewInfo : {

        }
      });
      export default SingleRepository;
      