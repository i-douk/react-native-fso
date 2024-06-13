import { useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const useSignOut = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage()

  const signOut = () => {
    authStorage.removeAccessToken('accessToken');

    client.clearStore();

  };

  return signOut;
};

export default useSignOut;
