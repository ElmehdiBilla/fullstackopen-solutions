import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
import theme from '../theme';

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
});

const initialValues = {
    username: '',
    password: '',
};

const onSubmit = (values) => {
    console.log(values.username);
    console.log(values.password);
};

const SignIn = () => {
    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                style={styles.textInput}
            />
            <TextInput
                placeholder='Password'
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                secureTextEntry
                style={styles.textInput}
            />
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
        </View>
    );
};

export default SignIn;
