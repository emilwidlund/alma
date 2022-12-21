import { ApolloProvider } from '@apollo/client';
import { inject as injectAnalytics } from '@vercel/analytics';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { apolloClient } from '../../apollo/client';
import { useWelcomeModal } from '../../hooks/useWelcomeModal/useWelcomeModal';
import { ModalProvider } from '../../providers/ModalProvider/ModalProvider';
import { CircuitRoute } from '../../routes/CircuitRoute/CircuitRoute';
import { LandingRoute } from '../../routes/LandingRoute/LandingRoute';
import { ProfileRoute } from '../../routes/ProfileRoute/ProfileRoute';
import { ProjectRoute } from '../../routes/ProjectRoute/ProjectRoute';
import { transitionGroupWrapperStyles } from './App.styles';

injectAnalytics();

export const App = () => {
    return (
        <Router>
            <ApolloProvider client={apolloClient}>
                <ModalProvider>
                    <AppRoutes />
                </ModalProvider>
            </ApolloProvider>
        </Router>
    );
};

export const AppRoutes = () => {
    const { open: openWelcomeModal } = useWelcomeModal();
    const location = useLocation();
    const [params] = useSearchParams();

    React.useEffect(() => {
        if (!localStorage.getItem('onboardingCompleted') || params.get('onboarding') === 'true') {
            openWelcomeModal({
                onClose: () => {
                    localStorage.setItem('onboardingCompleted', 'true');
                }
            });
        }
    }, []);

    return (
        <TransitionGroup className={transitionGroupWrapperStyles}>
            <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
                <Routes location={location}>
                    <Route path="/" element={<LandingRoute />} index />
                    <Route path="/:username" element={<ProfileRoute />} />
                    <Route path="/:username/:projectId" element={<ProjectRoute />} />
                    <Route path="/:username/:projectId/circuit" element={<CircuitRoute />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};
