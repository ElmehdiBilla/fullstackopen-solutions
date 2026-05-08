import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: theme.colors.white,
        borderRadius: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: theme.colors.gray,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: theme.fontSizes.subheading,
        backgroundColor: theme.colors.white,
        marginBottom: 12,
    },

    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: theme.colors.white,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
    },
    textInputError: {
        borderColor: theme.colors.error,
        marginBottom: 6,
    },
    error: {
        color: theme.colors.error,
        marginBottom: 12,
    },
});

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                style={[styles.textInput, formik.touched.username && formik.errors.username && styles.textInputError]}
                onBlur={formik.handleBlur('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={styles.error}>{formik.errors.username}</Text>
            )}
            <TextInput
                placeholder='Password'
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                secureTextEntry
                style={[styles.textInput, formik.touched.password && formik.errors.password && styles.textInputError]}
                onBlur={formik.handleBlur('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={styles.error}>{formik.errors.password}</Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
        </View>
    );
};

const SignIn = () => {
    const navigate = useNavigate();
    const [signIn] = useSignIn();
    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signIn({ username, password });
            console.log(data);
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };
    return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
