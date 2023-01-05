import { useQuery } from '@apollo/client';

import { Query } from '../../../generated/graphql';
import ME_QUERY from '../../apollo/queries/me.gql';

export const useAuth = () => {
    const { data: meData, loading } = useQuery<Query>(ME_QUERY);

    return {
        loading,
        isAuthenticated: !!meData?.me,
        user: meData?.me
    };
};
