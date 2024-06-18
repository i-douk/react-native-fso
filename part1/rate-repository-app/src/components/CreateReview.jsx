import React from 'react';
import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const validationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required('Repository Name is required'),
  ownerName: yup
    .string()
    .required('Repository Owner is required'),
  rating: yup
    .number()
    .min(0).max(100)
    .required('Rating is required'),
  review: yup.string()
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
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: ''
};

export const CreateReviewForm = ({ onSubmit }) => {
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
          formik.touched.ownerName && formik.errors.ownerName && styles.errorField,
        ]}
        placeholder="Repository Owner"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[
          styles.field,
          formik.touched.repositoryName && formik.errors.repositoryName && styles.errorField,
        ]}
        placeholder="Repository Name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={[
          styles.field,
          formik.touched.rating && formik.errors.rating && styles.errorField,
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[
          styles.field,
          formik.touched.review && formik.errors.review && styles.errorField,
        ]}
        textAlignVertical='top'
        multiline={true}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        onBlur={formik.handleBlur('review')}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={styles.errorText}>{formik.errors.review}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={{ color: 'white' }}>Create review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  
  const [mutate, result] = useMutation(CREATE_REVIEW);
  
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;
    console.log(values)
    try {
      const accessToken = await authStorage.getAccessToken();
      const { data } = await mutate({
        variables: { ownerName, repositoryName, rating: rating, text: review }
      });
      console.log(data);
      console.log(result)
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log('Error creating a new review:', e);
    }
  };

  return <CreateReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
