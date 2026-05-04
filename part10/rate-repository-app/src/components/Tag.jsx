import { StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        color: theme.colors.white,
        backgroundColor: theme.colors.primary,
        paddingBlock: 4,
        paddingInline: 8,
        borderRadius: 5,
    },
});

const Tag = ({ text }) => {
    return <Text style={styles.container}>{text}</Text>;
};

export default Tag;
