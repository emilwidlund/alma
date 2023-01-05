import * as React from 'react';
import { Link, NavLink, NavLinkProps } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth/useAuth';
import { Size } from '../../types';
import { Avatar } from '../Avatar/Avatar';
import {
    navBarAsideStyles,
    navBarItemsStyles,
    navBarLinkStyles,
    navBarUserInfoStyles,
    navBarWrapperStyles
} from './NavBar.styles';

export const NavBar = () => {
    const { user, loading: authLoading } = useAuth();

    const userData =
        user && !authLoading ? (
            <Link to={`/${user.username}`}>
                <div className={navBarUserInfoStyles}>
                    <Avatar size={Size.SM} media={user.mediaUrl} />
                </div>
            </Link>
        ) : (
            <>
                <div
                    id="g_id_onload"
                    data-client_id="785262617476-4u41ihbtru71cirr1179io3v6el5rpv1.apps.googleusercontent.com"
                    data-context="signin"
                    data-ux_mode="popup"
                    data-login_uri={`https://local.alma.sh:3001/oauth/google/one-tap?redirect_uri=${window.location.origin}`}
                    data-auto_prompt="false"
                ></div>

                <div
                    className="g_id_signin"
                    data-type="standard"
                    data-shape="rectangular"
                    data-theme="outline"
                    data-text="signin_with"
                    data-size="large"
                    data-logo_alignment="left"
                ></div>
            </>
        );

    return (
        <div className={navBarWrapperStyles}>
            <NavBarItem to="/" children="Λlma" />
            <div className={navBarAsideStyles}>
                <div className={navBarItemsStyles}>
                    <NavBarItem to="/explore" children="Explore" />
                    {user && <NavBarItem to={`/${user.username}`} children="Dashboard" />}
                </div>
                {userData}
            </div>
        </div>
    );
};

export const NavBarItem = (props: NavLinkProps) => {
    return <NavLink {...props} className={navBarLinkStyles}></NavLink>;
};
