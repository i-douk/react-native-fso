import { useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage()

  const signOut = () => {
    authStorage.removeAccessToken('accessToken');

    apolloClient.resetStore();

  };

  return signOut;
};

export default useSignOut;
