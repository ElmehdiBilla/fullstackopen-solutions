import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import RepositoryView from './RepositoryView';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = () => {
    let { id } = useParams();
    const { data } = useQuery(GET_REPOSITORY, {
        variables: {
            id,
        },
        fetchPolicy: 'cache-and-network',
    });

    const repo = data?.repository ? data?.repository : {};
    const reviews = repo ? repo?.reviews?.edges?.map((edge) => edge.node) : [];

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => (
                <>
                    <RepositoryView repository={repo} />
                    <ItemSeparator />
                </>
            )}
            stickyHeaderIndices={[0]}
        />
    );
};

export default Repository;
