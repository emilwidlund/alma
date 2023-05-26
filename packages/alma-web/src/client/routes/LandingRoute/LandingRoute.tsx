import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
    gradientStyles,
    landingRouteButtonGroupStyles,
    landingRouteFooterStyles,
    landingRouteHeroContentStyles,
    landingRouteHeroHeadlineStyles,
    landingRouteHeroParagraphStyles,
    landingRouteStyles
} from './LandingRoute.styles';
import { Button } from '../../components/Button/Button';
import { ButtonVariant } from '../../components/Button/Button.types';
import { Gradient } from '../../components/MeshGradient/MeshGradient.js';
import { Scene } from '../../components/Scene/Scene';

export const LandingRoute = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        const gradient = new Gradient();
        gradient.initGradient('#gradient-canvas');
    }, []);

    const navigateToPlayground = React.useCallback(() => {
        navigate('/playground');
    }, [navigate]);

    const navigateToGithub = React.useCallback(() => {
        navigate('https://github.com/emilwidlund/alma');
    }, [navigate]);

    return (
        <Scene>
            <div className={landingRouteStyles}>
                <canvas className={gradientStyles} id="gradient-canvas" data-transition-in />
                <div className={landingRouteHeroContentStyles}>
                    <img src="/assets/images/logo.png" width={100} />
                    <h1 className={landingRouteHeroHeadlineStyles}>Alma</h1>
                    <p className={landingRouteHeroParagraphStyles}>An interactive playground for generative graphics</p>
                    <div className={landingRouteButtonGroupStyles}>
                        <Button label="Open Playground" onPress={navigateToPlayground} />
                        <Button variant={ButtonVariant.SECONDARY} label="View on Github" onPress={navigateToGithub} />
                    </div>
                </div>
                <footer className={landingRouteFooterStyles}>
                    <a href="https://emilwidlund.com?ref=alma.sh" target="_blank">
                        Made by Emil Widlund
                    </a>
                </footer>
            </div>
        </Scene>
    );
};
