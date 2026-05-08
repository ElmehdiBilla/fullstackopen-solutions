import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const Review = async ({ ownerName, repositoryName, rating, text }) => {
        const { data } = await mutate({
            variables: {
                review: { ownerName, repositoryName, rating: Number(rating), text },
            },
        });

        return { data };
    };

    return [Review, result];
};

export default useReview;
