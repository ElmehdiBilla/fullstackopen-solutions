import { useFormik } from 'formik';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
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
    serverError: {
        color: theme.colors.error,
        marginBottom: 12,
        backgroundColor: '#fac1c7',
        padding: 5,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(5, 'Username must be between 5 and 30 characters')
        .max(30, 'Username must be between 5 and 30 characters')
        .required('Username is required'),
    password: yup
        .string()
        .min(5, 'Password must be between 5 and 50 characters')
        .max(50, 'Password must be between 5 and 50 characters')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Password confirmation is required'),
});

const Form = ({ onSubmit, error }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            {error && <Text style={styles.serverError}>{error.message}</Text>}
            <TextInput
                placeholder='Username'
                placeholderTextColor={theme.colors.textSecondary}
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
                placeholderTextColor={theme.colors.textSecondary}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                secureTextEntry
                style={[styles.textInput, formik.touched.password && formik.errors.password && styles.textInputError]}
                onBlur={formik.handleBlur('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={styles.error}>{formik.errors.password}</Text>
            )}
            <TextInput
                placeholder='Password Confirmation'
                placeholderTextColor={theme.colors.textSecondary}
                value={formik.values.passwordConfirmation}
                onChangeText={formik.handleChange('passwordConfirmation')}
                secureTextEntry
                style={[
                    styles.textInput,
                    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && styles.textInputError,
                ]}
                onBlur={formik.handleBlur('passwordConfirmation')}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <Text style={styles.error}>{formik.errors.passwordConfirmation}</Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
        </View>
    );
};

const SignUp = () => {
    const navigate = useNavigate();
    const [signUp, { error }] = useSignUp();
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signUp({ username, password });
            console.log(data);
            await signIn({ username, password });
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };
    return <Form onSubmit={onSubmit} error={error} />;
};

export default SignUp;
