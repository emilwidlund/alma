import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Scene } from '../../components/Scene/Scene';
import { LandingRoute } from '../../routes/LandingRoute/LandingRoute';
import { SchematicRoute } from '../../routes/SchematicRoute/SchematicRoute';
import { transitionGroupWrapper } from './App.styles';

export const App = () => {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
};

export const AppRoutes = () => {
    const location = useLocation();

    return (
        <TransitionGroup className={transitionGroupWrapper}>
            {/*
            This is no different than other usage of
            <CSSTransition>, just make sure to pass
            `location` to `Switch` so it can match
            the old location as it animates out.
          */}
            <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
                <Routes location={location}>
                    <Route path="/" element={<LandingRoute />} />
                    <Route path="/about" element={<Scene />} />
                    <Route path="/schematic/:id" element={<SchematicRoute />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};
