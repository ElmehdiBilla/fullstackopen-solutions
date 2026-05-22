import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER } from '../graphql/queries';
import { FlatList, StyleSheet, View } from 'react-native';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Reviews = () => {
    const { data } = useQuery(GET_CURRENT_USER, {
        variables: { includeReviews: true },
        fetchPolicy: 'cache-and-network',
    });

    const reviews = data ? data?.me?.reviews?.edges.map((edge) => edge.node) : [];

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={(item) => item.id}
        />
    );
};

export default Reviews;
