import { Pressable, StyleSheet, View, Alert } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client/react';

const size = 50;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
    },
    content: {
        padding: 10,
        flexDirection: 'row',
    },
    meta: {
        flex: 1,
    },
    rating: {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderColor: theme.colors.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 10,
    },
    describtion: {
        marginTop: 10,
    },
    btnContainer: {
        flexDirection: 'row',
        padding: 10,
        borderColor: theme.colors.gray,
        borderTopWidth: 1,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
    },
    primary: {
        backgroundColor: theme.colors.primary,
    },
    destructive: {
        backgroundColor: theme.colors.error,
    },
    buttonText: {
        color: theme.colors.white,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
    },
});

const ReviewItem = ({ review, refetch, actions }) => {
    let navigate = useNavigate();
    const [mutate] = useMutation(DELETE_REVIEW);

    const handleDelete = (id) => {
        Alert.alert(
            'Delete Review',
            'Are you sure you want to delete this review',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await mutate({ variables: { deleteReviewId: id } });
                            refetch();
                        } catch (e) {
                            console.log(e);
                        }
                    },
                },
            ],
            {
                cancelable: true,
            },
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.rating}>
                    <Text color='primary' fontSize='subheading' fontWeight='bold'>
                        {review.rating}
                    </Text>
                </View>
                <View style={styles.meta}>
                    <Text fontWeight='bold'>{review.user.username}</Text>
                    <Text>{format(review.createdAt, 'dd MMM yyyy')}</Text>
                    <Text style={styles.describtion}>{review.text}</Text>
                </View>
            </View>
            {actions && (
                <View style={styles.btnContainer}>
                    <Pressable
                        style={[styles.button, styles.primary]}
                        onPress={() => navigate(`/repository/${review.repositoryId}`)}>
                        <Text style={styles.buttonText}>View Repository</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.destructive]} onPress={() => handleDelete(review.id)}>
                        <Text style={styles.buttonText}>Delete Review</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default ReviewItem;
