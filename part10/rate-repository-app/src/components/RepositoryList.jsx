import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import OrderDropdown from './OrderDropdown';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, OrderDropdown }) => {
    let navigate = useNavigate();
    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
                    <RepositoryItem item={item} />
                </Pressable>
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={OrderDropdown}
            stickyHeaderIndices={[0]}
        />
    );
};

const RepositoryList = () => {
    const { repositories, orderBy, orderDirection, setOrderBy, setOrderDerection } = useRepositories();

    return (
        <RepositoryListContainer
            repositories={repositories}
            OrderDropdown={
                <OrderDropdown
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    orderDirection={orderDirection}
                    setOrderDerection={setOrderDerection}
                />
            }
        />
    );
};

export default RepositoryList;
