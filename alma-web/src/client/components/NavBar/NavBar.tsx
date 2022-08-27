import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { navBarItemsStyles, navBarLinkStyles, navBarWrapperStyles } from './NavBar.styles';

export const NavBar = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <div className={navBarWrapperStyles}>
            <NavBarItem to="/" children="Λlma" />
            <div className={navBarItemsStyles}>{children}</div>
        </div>
    );
};

export const NavBarItem = (props: NavLinkProps) => {
    return <NavLink {...props} className={navBarLinkStyles}></NavLink>;
};
