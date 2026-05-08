import * as Linking from 'expo-linking';
import { Pressable, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import theme from "../theme";

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

const RepositoryView = ({ repository }) => {
    return (
        <View style={styles.container}>
            <RepositoryItem item={repository} />
            <Pressable style={styles.button} onPress={() => Linking.openURL(repository.url)}>
                <Text style={styles.buttonText}>Open in GitHub</Text>
            </Pressable>
        </View>
    );
};

export default RepositoryView;
