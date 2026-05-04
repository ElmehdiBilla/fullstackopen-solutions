import { View, StyleSheet } from 'react-native';
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
            <AppBarTab text='Repositories' to='/' />
            <AppBarTab text='Sign in' to='/signin' />
        </View>
    );
};

export default AppBar;
