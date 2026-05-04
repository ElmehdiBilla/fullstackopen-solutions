import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.textPrimary,
    },
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
                <AppBarTab text='Repositories' to='/' />
                <AppBarTab text='Sign in' to='/signin' />
            </ScrollView>
        </View>
    );
};

export default AppBar;
