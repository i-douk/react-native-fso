import { AUTHENTICATE } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
const useSignIn = () => {
  const authStorage = useAuthStorage();

  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const apolloClient = useApolloClient();
    const credentials = {
      username,
      password
    };

    try {
      const {data} = await mutate({ variables: { credentials } });
      console.log(data)
      await authStorage.setAccessToken(data.authenticate.accessToken)
      apolloClient.resetStore();
      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error; 
    }
  };
  return [signIn, result];
};

export default useSignIn;
