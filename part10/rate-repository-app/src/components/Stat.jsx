import { StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});

const Stat = ({ headerText, footerText }) => {

    return (
        <View style={styles.container}>
            <Text fontWeight='bold' fontSize='subheading'>
                {headerText}
            </Text>
            <Text color='textSecondary'>{footerText}</Text>
        </View>
    );
};

export default Stat;
