import { useFormik } from 'formik';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import useReview from '../hooks/useReview';

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
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
};

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup
        .number()
        .typeError('Rating must be a number')
        .min(0, 'Rating must be between 0 and 100')
        .max(100, 'Rating must be between 0 and 100')
        .integer('Rating must be a whole number')
        .required('Rating is required'),
    text: yup.string().optional(),
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
                placeholder='Repository owner name'
                placeholderTextColor={theme.colors.textSecondary}
                value={formik.values.ownerName}
                onChangeText={formik.handleChange('ownerName')}
                style={[styles.textInput, formik.touched.ownerName && formik.errors.ownerName && styles.textInputError]}
                onBlur={formik.handleBlur('ownerName')}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={styles.error}>{formik.errors.ownerName}</Text>
            )}
            <TextInput
                placeholder='Repository name'
                placeholderTextColor={theme.colors.textSecondary}
                value={formik.values.repositoryName}
                onChangeText={formik.handleChange('repositoryName')}
                style={[
                    styles.textInput,
                    formik.touched.repositoryName && formik.errors.repositoryName && styles.textInputError,
                ]}
                onBlur={formik.handleBlur('repositoryName')}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={styles.error}>{formik.errors.repositoryName}</Text>
            )}

            <TextInput
                placeholder='Rating between 0 and 100'
                placeholderTextColor={theme.colors.textSecondary}
                value={formik.values.rating}
                onChangeText={formik.handleChange('rating')}
                style={[styles.textInput, formik.touched.rating && formik.errors.rating && styles.textInputError]}
                onBlur={formik.handleBlur('rating')}
                keyboardType='numeric'
            />
            {formik.touched.rating && formik.errors.rating && <Text style={styles.error}>{formik.errors.rating}</Text>}
            <TextInput
                placeholder='Review'
                placeholderTextColor={theme.colors.textSecondary}
                value={formik.values.text}
                onChangeText={formik.handleChange('text')}
                style={[styles.textInput, formik.touched.text && formik.errors.text && styles.textInputError]}
                onBlur={formik.handleBlur('text')}
                multiline
                numberOfLines={3}
            />
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
        </View>
    );
};

const ReviewForm = () => {
    const navigate = useNavigate();
    const [review, { error }] = useReview();

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values;

        try {
            const { data } = await review({ ownerName, repositoryName, rating, text });
            console.log(data);
            navigate(`/repository/${data?.createReview?.repositoryId}`);
        } catch (e) {
            console.log(e);
        }
    };
    return <Form onSubmit={onSubmit} error={error} />;
};

export default ReviewForm;
