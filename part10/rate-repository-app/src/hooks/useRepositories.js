import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useState } from 'react';

const useRepositories = () => {
    const [orderBy, setOrderBy] = useState('CREATED_AT');
    const [orderDirection, setOrderDerection] = useState('DESC');
    const [searchKeyword, setSearchKeyword] = useState('');

    const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
        variables: { first: 5, orderBy, orderDirection, searchKeyword },
        fetchPolicy: 'cache-and-network',
    });

    const handleFetchMore = () => {
        
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                first:5,
                after: data.repositories.pageInfo.endCursor,
                orderBy,
                orderDirection,
                searchKeyword,
            },
        });
    };

    return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        loading,
        orderBy,
        orderDirection,
        setOrderBy,
        setOrderDerection,
        setSearchKeyword,
    };
};

export default useRepositories;
