import React from 'react';
import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import Text from './Text';
import theme from '../theme';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const styles = StyleSheet.create({
  field: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    padding: 15,
    margin: 10,
  },
  errorField: {
    borderColor: '#d73a4a',
  },
  button: {
    padding: 15,
    margin: 10,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  errorText: {
    color: '#d73a4a',
    marginLeft: 10,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View>
      <TextInput
        style={[
          styles.field,
          formik.touched.username && formik.errors.username && styles.errorField,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.field,
          formik.touched.password && formik.errors.password && styles.errorField,
        ]}
        secureTextEntry={true}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={{ color: 'white' }}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log('Access Token:', data.authenticate.accessToken);
    } catch (e) {
      console.log('Error signing in:', e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
