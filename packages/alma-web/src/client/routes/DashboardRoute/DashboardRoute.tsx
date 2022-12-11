import { useQuery } from '@apollo/client';
import * as React from 'react';

import { Query, QueryGetUserArgs } from '../../../generated/graphql';
import GET_USER_QUERY from '../../apollo/queries/getUser.gql';
import { Avatar } from '../../components/Avatar/Avatar';
import { Heading } from '../../components/Heading/Heading';
import { Scene } from '../../components/Scene/Scene';
import { Size } from '../../types';

export const DashboardRoute = () => {
    const { data, loading } = useQuery<Query, QueryGetUserArgs>(GET_USER_QUERY, {
        variables: { id: 'clbiempla0000wwszwq301dbf' }
    });

    if (loading || !data?.getUser) {
        return null;
    }

    return (
        <Scene>
            <h1>Dashboard</h1>
            <div>
                <Avatar size={Size.LG} media={data.getUser.mediaUrl} />
                <div>
                    <Heading size={Size.MD}>{data.getUser.name}</Heading>
                    <Heading size={Size.SM}>{data.getUser.username}</Heading>
                </div>
            </div>
        </Scene>
    );
};
