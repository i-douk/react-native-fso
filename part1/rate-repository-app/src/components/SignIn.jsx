import Text from './Text';
import { Pressable, TextInput, View , StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
const styles = StyleSheet.create({
  field: {
    border :theme.borders.primary,
    padding : 15,
    margin : 10
  },
  button : {
    padding : 15,
    margin: 10
  }
});
const initialValues = {
  username: '',
  password: '',
};

const onSubmit = (values) => {
  console.log(values);
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View>
      <TextInput
        style={styles.field}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={styles.field}
        secureTextEntry= {true}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable
         onPress={formik.handleSubmit}>
        <Text backgroundColor='blue' border='primary' padding='button' style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  return <SignInForm onSubmit={onSubmit}/>}

export default SignIn;