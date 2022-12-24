import { useQuery } from '@apollo/client';
import * as React from 'react';
import { Link, NavLink, NavLinkProps } from 'react-router-dom';

import { Query } from '../../../generated/graphql';
import ME_QUERY from '../../apollo/queries/me.gql';
import { Size } from '../../types';
import { Avatar } from '../Avatar/Avatar';
import {
    navBarAsideStyles,
    navBarItemsStyles,
    navBarLinkStyles,
    navBarUserInfoStyles,
    navBarUserUsernameStyles,
    navBarWrapperStyles
} from './NavBar.styles';

export const NavBar = () => {
    const { data } = useQuery<Query>(ME_QUERY);

    const userData = data?.me && (
        <div className={navBarUserInfoStyles}>
            <span className={navBarUserUsernameStyles}>{data?.me?.username}</span>
            <Link to={`/${data?.me?.username}`}>
                <Avatar size={Size.SM} media={data?.me.mediaUrl} />
            </Link>
        </div>
    );

    return (
        <div className={navBarWrapperStyles}>
            <NavBarItem to="/" children="Λlma" />
            <div className={navBarAsideStyles}>
                <div className={navBarItemsStyles}>
                    <NavBarItem to="/explore" children="Explore" />
                    <NavBarItem to="/emilwidlund" children="Dashboard" />
                </div>
                {userData}
            </div>
        </div>
    );
};

export const NavBarItem = (props: NavLinkProps) => {
    return <NavLink {...props} className={navBarLinkStyles}></NavLink>;
};
