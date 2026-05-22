import { Picker } from '@react-native-picker/picker';
import { Platform, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: 'transparent',
        borderColor: theme.colors.gray,
        borderWidth: 1,
        fontSize: theme.fontSizes.subheading,
        ...(Platform.OS === 'web' && {
            height: 48,
            paddingHorizontal: 12,
            outlineWidth: 0,
            outlineStyle: 'none',
            outlineColor: 'transparent',
            cursor: 'pointer',
        }),
    },
});
const OrderDropdown = ({ orderBy, orderDirection, setOrderBy, setOrderDerection }) => {
    return (
        <Picker
            style={styles.dropdown}
            selectedValue={`${orderBy}-${orderDirection}`}
            onValueChange={(value) => {
                const [newOrderBy, newOrderDirection] = value.split('-');
                setOrderBy(newOrderBy);
                setOrderDerection(newOrderDirection);
            }}>
            <Picker.Item label='Select item' value='' enabled={false} />
            <Picker.Item label='Latest repositories' value='CREATED_AT-DESC' />
            <Picker.Item label='Highest rated repositories' value='RATING_AVERAGE-DESC' />
            <Picker.Item label='Lowest rated repositories' value='RATING_AVERAGE-ASC' />
        </Picker>
    );
};

export default OrderDropdown;
