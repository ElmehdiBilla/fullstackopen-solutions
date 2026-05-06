import { useApolloClient, useMutation } from '@apollo/client/react';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(AUTHENTICATE);

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({
            variables: {
                credentials: { username, password },
            },
        });

        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
        return { data };
    };

    return [signIn, result];
};

export default useSignIn;
