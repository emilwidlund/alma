import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import { NavBar } from '../../components/NavBar/NavBar';
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
        navigate('/circuit/123');
    }, []);

    return (
        <Scene>
            <div className={landingRouteContentOuterStyles()}>
                <div className={landingRouteContentStyles(false)}>
                    <NavBar />
                </div>
                <div className={landingRouteContentStyles()}>
                    <div className={landingRouteHeroStyles}>
                        <Heading size={Size.LG}>Λlma</Heading>
                        <p>Your digital playground for generative graphics</p>
                        <Button label="Get Started" onPress={handleNavigateToCTA} />
                    </div>
                </div>
            </div>
            <div className={landingRouteContentOuterStyles()}>
                <div className={landingRouteContentStyles()}>
                    <a
                        href={`https://local.alma.sh:3001/oauth/google?redirect_uri=${window.location.origin}`}
                        target="_blank"
                    >
                        Sign in with Google
                    </a>
                </div>
            </div>
        </Scene>
    );
};
