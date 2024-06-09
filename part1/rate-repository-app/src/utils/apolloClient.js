import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = (uri) => {
  return new ApolloClient({
    uri: uri,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;