import React from 'react';
import { StyleSheet , View, Image } from 'react-native';
import Text from './Text';
const styles = StyleSheet.create({
    separator: {
      height: 10,
      backgroundColor : '#E5E4E2'
    },
    itemContainer: {
  
      padding: 10,
      backgroundColor: '#fff',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    itemHeader: {
      marginBottom: 10,
    },
    itemDetails: {
      marginLeft: 10,
      justifyContent: 'center',
    },
    fullName: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    description: {
      fontSize: 14,
      color: '#586069',
    },
    language: {
      fontSize: 14,
      color: '#FFFF',
      marginTop: 5,
      padding: 5,
      backgroundColor: '#6082B6',
      alignSelf: 'flex-start',
      borderRadius: 3,
    },
    detailContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        padding: 20
    },
    detail: {
        flexDirection : 'column',
        alignItems: 'center'
    }
  });

export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.itemDetails}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.detail}>
        <Text fontWeight='bold'>Stars</Text>
        <Text>{item.stargazersCount}</Text>
        </View>
        <View style={styles.detail}>
        <Text fontWeight='bold'>Forks</Text>
        <Text>{item.forksCount}</Text>
        </View>
        <View style={styles.detail}>
        <Text fontWeight='bold'>Reviews</Text>
        <Text>{item.reviewCount}</Text>
        </View>
        <View style={styles.detail}>
        <Text fontWeight='bold'>Rating</Text>
        <Text>{item.ratingAverage}</Text>
        </View>
      </View>
    </View>
  );

  export default RepositoryItem;
  