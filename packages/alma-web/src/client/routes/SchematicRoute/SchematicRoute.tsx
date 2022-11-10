import * as React from 'react';

import { NavBar, NavBarItem } from '../../components/NavBar/NavBar';
import { Scene } from '../../components/Scene/Scene';
import { PropertyPanel } from '../../containers/PropertyPanel/PropertyPanel';
import { SchematicContainer } from '../../containers/SchematicContainer/SchematicContainer';
import { SchematicProvider } from '../../providers/SchematicProvider/SchematicProvider';
import { schematicRouteWrapperStyles } from './SchematicRoute.styles';

export const SchematicRoute = () => {
    return (
        <SchematicProvider context={context}>
            <Scene>
                <NavBar>
                    <NavBarItem to="/gallery" children="Gallery" />
                    <NavBarItem to="/about" children="About" />
                    <NavBarItem to="/dashboard" children="Dashboard" />
                </NavBar>
                <div className={schematicRouteWrapperStyles}>
                    <SchematicContainer />
                    <PropertyPanel />
                </div>
            </Scene>
        </SchematicProvider>
    );
};
