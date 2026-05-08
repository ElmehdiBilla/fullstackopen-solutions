import { Image, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';
import Stat from './Stat';
import Tag from './Tag';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
    },
    headerContent: {
        flex:1,
        paddingLeft: 10,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    headerContentText: {
        marginBottom:7
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
});

export const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
});

const RepositoryItem = ({ item }) => {
    return (
        <View testID='repositoryItem' style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
                <View style={styles.headerContent}>
                    <View style={styles.headerContentText}>
                        <Text fontSize='subheading' fontWeight='bold'>
                            {item.fullName}
                        </Text>
                        <Text color='textSecondary'>{item.description}</Text>
                    </View>
                    <Tag text={item.language} />
                </View>
            </View>
            <View style={styles.footer}>
                <Stat footerText='Forks' headerText={formatter.format(item.forksCount)} />
                <Stat footerText='Stars' headerText={formatter.format(item.stargazersCount)} />
                <Stat footerText='Reviews' headerText={formatter.format(item.reviewCount)} />
                <Stat footerText='Rating' headerText={formatter.format(item.ratingAverage)} />
            </View>
        </View>
    );
};

export default RepositoryItem;
