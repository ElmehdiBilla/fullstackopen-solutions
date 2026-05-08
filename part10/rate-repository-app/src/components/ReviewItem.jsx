import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { format } from 'date-fns';

const size = 50;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
        padding: 10,
    },
    content: {
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
});

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.container}>
            <View style={styles.rating}>
                <Text color='primary' fontSize='subheading' fontWeight='bold'>
                    {review.rating}
                </Text>
            </View>
            <View style={styles.content}>
                <Text fontWeight='bold'>{review.user.username}</Text>
                <Text>{format(review.createdAt, 'dd MMM yyyy')}</Text>
                <Text style={styles.describtion}>{review.text}</Text>
            </View>
        </View>
    );
};

export default ReviewItem;
