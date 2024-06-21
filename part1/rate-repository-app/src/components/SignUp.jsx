import React from 'react';
import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup
  .string()
  .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
  passwordConfirm : yup
     .string()
     .oneOf([yup.ref('password'), null])
     .required('Password confirm is required')
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
  passwordConfirm:''
  };
  
  export const SignUpForm = ({ onSubmit }) => {
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
      <TextInput
        style={[
          styles.field,
          formik.touched.passwordConfirm && formik.errors.passwordConfirm && styles.errorField,
          ]}
        secureTextEntry={true}
        placeholder="Password Confirmation"
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
        onBlur={formik.handleBlur('passwordConfirm')}
        />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={styles.errorText}>{formik.errors.passwordConfirm}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={{ color: 'white' }}>Sign up</Text>
      </Pressable>
    </View>
  );
  };

const SignUp = () => {
    const navigate = useNavigate();
    const [signIn] = useSignIn();
    const [mutate, result] = useMutation(CREATE_USER);

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
        await mutate({
            variables: { 
              user: { 
                username,
                password
              }  
            }
          });

        setTimeout( async() => {
          await signIn({ username, password });
          navigate('/repositories');
        }, "2000");
          
    } catch (e) {
      console.log('Error signing in:', e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
