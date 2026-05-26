import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import OrderDropdown from './OrderDropdown';
import { Searchbar } from 'react-native-paper';
import theme from '../theme';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    ListHeaderComponent: {
        backgroundColor: theme.colors.gray,
        padding: 8,
    },
    Searchbar: {
        backgroundColor: theme.colors.white,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, OrderDropdown, setSearchKeyword, onEndReached }) => {
    let navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const debounced = useDebouncedCallback((value) => {
        setSearchKeyword(value);
    }, 500);
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
            ListHeaderComponent={
                <View style={styles.ListHeaderComponent}>
                    <Searchbar
                        style={styles.Searchbar}
                        placeholder='Search'
                        value={searchQuery}
                        onChangeText={(value) => {
                            setSearchQuery(value);
                            debounced(value);
                        }}
                    />
                    {OrderDropdown}
                </View>
            }
            stickyHeaderIndices={[0]}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
        />
    );
};

const RepositoryList = () => {
    const { repositories, fetchMore, orderBy, orderDirection, setOrderBy, setOrderDerection, setSearchKeyword } =
        useRepositories();

    return (
        <RepositoryListContainer
            repositories={repositories}
            setSearchKeyword={setSearchKeyword}
            OrderDropdown={
                <OrderDropdown
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    orderDirection={orderDirection}
                    setOrderDerection={setOrderDerection}
                />
            }
            onEndReached={fetchMore}
        />
    );
};

export default RepositoryList;
