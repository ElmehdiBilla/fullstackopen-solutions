import { View, StyleSheet, ScrollView } from 'react-native';
import { useApolloClient, useQuery } from '@apollo/client/react';
import useAuthStorage from '../hooks/useAuthStorage';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { GET_CURRENT_USER } from '../graphql/queries';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.textPrimary,
    },
});

const AppBar = () => {
    let navigate = useNavigate();
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    const { data } = useQuery(GET_CURRENT_USER);

    const signOut = async () => {
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
        navigate('/');
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
                <AppBarTab text='Repositories' to='/' />
                {!data?.me ? (
                    <>
                        <AppBarTab text='Sign in' to='/signin' />
                        <AppBarTab text='Sign up' to='/signup' />
                    </>
                ) : (
                    <>
                        <AppBarTab text='Create a review' to='/review' />
                        <AppBarTab text='My Reviews' to='/myreviews' />
                        <AppBarTab text='Sign out' onPress={signOut} />
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;
