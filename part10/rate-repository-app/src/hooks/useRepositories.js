import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useState } from 'react';

const useRepositories = () => {
    const [orderBy, setOrderBy] = useState('CREATED_AT');
    const [orderDirection, setOrderDerection] = useState('DESC');
    const [searchKeyword, setSearchKeyword] = useState('');

    const { data, loading } = useQuery(GET_REPOSITORIES, {
        variables: { orderBy, orderDirection, searchKeyword },
        fetchPolicy: 'cache-and-network',
    });

    return { repositories: data?.repositories, loading, orderBy, orderDirection, setOrderBy, setOrderDerection, setSearchKeyword };
};

export default useRepositories;
