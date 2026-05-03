import { Text, View } from 'react-native';

const RepositoryItem = ({ item }) => {
    return (
        <View>
            <Text>Full name: {item.fullName}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Language: {item.language}</Text>
            <Text>Forks: {item.forksCount}</Text>
            <Text>Stars: {item.stargazersCount}</Text>
            <Text>reviews: {item.reviewCount}</Text>
            <Text>Rating{item.ratingAverage}</Text>
        </View>
    );
};

export default RepositoryItem;
