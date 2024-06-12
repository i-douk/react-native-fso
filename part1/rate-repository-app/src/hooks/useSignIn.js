import { AUTHENTICATE } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import useAuthStorage from '../hooks/useAuthStorage';
const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const credentials = {
      username,
      password
    };

    try {
      const response = await mutate({ variables: { credentials } });
      return response.data.authenticate.accessToken;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error; 
    }
  };

  return [signIn, result];
};

export default useSignIn;
