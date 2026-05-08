import { View, StyleSheet, ScrollView } from 'react-native';
import { useApolloClient, useQuery } from '@apollo/client/react';
import useAuthStorage from '../hooks/useAuthStorage';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.textPrimary,
    },
});

const AppBar = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    const { data } = useQuery(ME);

    const signOut = async () => {
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
                <AppBarTab text='Repositories' to='/' />
                {!data?.me ? (
                    <AppBarTab text='Sign in' to='/signin' />
                ) : (
                    <>
                        <AppBarTab text='Create a review' to='/review' />
                        <AppBarTab text='Sign out' onPress={signOut} />
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;
