import { Pressable, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import { useQuery } from '@apollo/client/react';
import Text from './Text';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        padding: 10,
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

const Repository = () => {
    let { id } = useParams();
    const { data } = useQuery(GET_REPOSITORY, {
        variables: {
            id,
        },
        fetchPolicy: 'cache-and-network',
    });

    const repo = data?.repository ? data?.repository : {};

    return (
        <View style={styles.container}>
            <RepositoryItem item={repo} />
            <Pressable style={styles.button} onPress={() => Linking.openURL(repo.url)}>
                <Text style={styles.buttonText}>Open in GitHub</Text>
            </Pressable>
        </View>
    );
};

export default Repository;
