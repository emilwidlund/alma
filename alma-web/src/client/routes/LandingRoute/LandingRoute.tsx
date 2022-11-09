import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import { NavBar, NavBarItem } from '../../components/NavBar/NavBar';
import { Scene } from '../../components/Scene/Scene';
import { Size } from '../../types';
import {
    landingRouteContentStyles,
    landingRouteContentOuterStyles,
    landingRouteHeroStyles
} from './LandingRoute.styles';

export const LandingRoute = () => {
    const navigate = useNavigate();

    const handleNavigateToCTA = React.useCallback(() => {
        navigate('/schematic/123');
    }, []);

    return (
        <Scene>
            <div className={landingRouteContentOuterStyles(true)}>
                <div className={landingRouteContentStyles(false)}>
                    <NavBar>
                        <NavBarItem to="/gallery" children="Gallery" />
                        <NavBarItem to="/about" children="About" />
                        <NavBarItem to="/dashboard" children="Dashboard" />
                    </NavBar>
                </div>
                <div className={landingRouteContentStyles()}>
                    <div className={landingRouteHeroStyles}>
                        <Heading size={Size.LG}>Λlma</Heading>
                        <p>Your digital playground for generative graphics</p>
                    </div>
                    <Button label="Try the demo" onPress={handleNavigateToCTA} size={Size.LG} glyph={'🡒'} />
                </div>
            </div>
            <div className={landingRouteContentOuterStyles()}>
                <div className={landingRouteContentStyles()}>
                    <Heading size={Size.SM} signifier="01.">
                        Nodes, Knobs & Sliders
                    </Heading>
                    <p>
                        Alma was created to bring parameterized inputs to the world of generative art. Twist, turn, move
                        & adjust values and see them affect your creation in realtime - all through an intuitive user
                        interface.
                    </p>
                    <Heading size={Size.SM} signifier="02.">
                        WebGL or Canvas
                    </Heading>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus turpis ut lobortis porta.
                        Fusce sit amet leo euismod est ullamcorper tristique ac a lacus. Sed sed ligula malesuada,
                        commodo enim vehicula, facilisis purus. Curabitur vulputate ullamcorper tortor imperdiet mattis.
                    </p>
                </div>
            </div>
        </Scene>
    );
};
