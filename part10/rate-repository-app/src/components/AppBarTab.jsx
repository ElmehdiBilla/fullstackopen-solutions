import { Pressable, StyleSheet, Text } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: theme.fontWeights.bold,
    },
});

const AppBarTab = ({ text }) => {
    return (
        <Pressable style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

export default AppBarTab;
