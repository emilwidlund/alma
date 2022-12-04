import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { useWelcomeModal } from '../../hooks/useWelcomeModal/useWelcomeModal';
import { ModalProvider } from '../../providers/ModalProvider/ModalProvider';
import { CircuitRoute } from '../../routes/CircuitRoute/CircuitRoute';
import { transitionGroupWrapperStyles } from './App.styles';

export const App = () => {
    return (
        <Router>
            <ModalProvider>
                <AppRoutes />
            </ModalProvider>
        </Router>
    );
};

export const AppRoutes = () => {
    const { open: openWelcomeModal } = useWelcomeModal();
    const location = useLocation();
    const [params] = useSearchParams();

    React.useEffect(() => {
        if (!localStorage.getItem('welcome') || params.get('welcome') === 'true') {
            openWelcomeModal({
                onClose: () => {
                    localStorage.setItem('welcome', 'true');
                }
            });
        }
    }, []);

    return (
        <TransitionGroup className={transitionGroupWrapperStyles}>
            {/*
            This is no different than other usage of
            <CSSTransition>, just make sure to pass
            `location` to `Switch` so it can match
            the old location as it animates out.
          */}
            <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
                <Routes location={location}>
                    {/* <Route path="/" element={<LandingRoute />} />
                    <Route path="/about" element={<Scene />} /> */}
                    <Route path="/" element={<CircuitRoute />} index />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};
