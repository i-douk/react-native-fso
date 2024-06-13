import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-native';
import useSignOut from '../hooks/useSignOut';

const SignOut = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    signOut();
    navigate('/signin');
  }, [signOut, navigate]);

  return null;
};

export default SignOut;
