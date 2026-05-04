import { StyleSheet, Text } from 'react-native';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    text: {
        color: theme.colors.white,
        fontSize: 24,
        fontWeight: theme.fontWeights.bold,
    },
});

const AppBarTab = ({ text, to }) => {
    return (
        <Link style={styles.container} to={to}>
            <Text style={styles.text}>{text}</Text>
        </Link>
    );
};

export default AppBarTab;
