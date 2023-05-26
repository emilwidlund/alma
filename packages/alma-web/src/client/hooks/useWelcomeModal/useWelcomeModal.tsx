import * as React from 'react';

import {
    onboardingModalContentHeadingStyles,
    onboardingModalContentStyles,
    onboardingModalContentTitleStyles,
    onboardingModalImageStyles,
    welcomeModalContentStyles,
    welcomeModalContentTitleStyles
} from './useWelcomeModal.styles';
import { IWelcomeModalOpenProps } from './useWelcomeModal.types';
import { Heading } from '../../components/Heading/Heading';
import { Icon } from '../../components/Icon/Icon';
import { WELCOME_MODAL_ID } from '../../constants/modals';
import { ModalContext } from '../../providers/ModalProvider/ModalProvider';
import { Size } from '../../types';

const WelcomeModalContent = () => {
    return (
        <div className={welcomeModalContentStyles}>
            <Icon name="stream" size={64} color="var(--accent-color)" />
            <Heading className={welcomeModalContentTitleStyles} size={Size.LG}>
                Welcome to Alma
            </Heading>
            <p>
                Alma is an interactive playground for generative graphics. It lets you compose nodes to craft beautiful
                effects and visual experiences - all through an intuitive user interface.
            </p>
            <p>
                This is a very early preview version.
                <br />
                Any questions or feedback can be sent to me on{' '}
                <a href="https://twitter.com/emilwidlund" target="_blank">
                    Twitter
                </a>
                .
            </p>
        </div>
    );
};

const WelcomeOnboarding1 = () => {
    return (
        <div className={onboardingModalContentStyles}>
            <div className={onboardingModalImageStyles('/assets/images/node.png')} />
            <div className={onboardingModalContentHeadingStyles}>
                <Icon name="settop_component" size={32} color="var(--accent-color)" outlined />
                <Heading className={onboardingModalContentTitleStyles} size={Size.MD} marginTop={24}>
                    Nodes
                </Heading>
            </div>
            <p>
                Nodes are the most central pieces in a circuit. They're building blocks which can represent a wide range
                of operations, such as trigonometry logic, texture sampling, color manipulation, and lighting
                calculations, to name a few.
            </p>
            <p>
                They can have input ports, output ports or often both. These are parameters that makes it possible to
                chain nodes together using connections. Each port has an associated type, which represents the kind of
                value it transports.
            </p>
        </div>
    );
};

const WelcomeOnboarding2 = () => {
    return (
        <div className={onboardingModalContentStyles}>
            <div className={onboardingModalImageStyles('/assets/images/connection.png')} />
            <div className={onboardingModalContentHeadingStyles}>
                <Icon name="conversion_path" size={32} color="var(--accent-color)" outlined />
                <Heading className={onboardingModalContentTitleStyles} size={Size.MD} marginTop={24}>
                    Connections
                </Heading>
            </div>
            <p>
                These transports logic throughout your circuit, making your creations incredibly flexible and fun to
                play with. Connections enforces a strict type-system; and may only be established between ports that
                inherit the same port type.
            </p>
            <p>
                Connections are initiated by pressing down an output port. While pressing, drag the mouse to the target
                input port and release. It's really that simple.
            </p>
        </div>
    );
};

const WelcomeOnboarding3 = () => {
    return (
        <div className={onboardingModalContentStyles}>
            <div className={onboardingModalImageStyles('/assets/images/glsl.png')} />
            <div className={onboardingModalContentHeadingStyles}>
                <Icon name="code" size={32} color="var(--accent-color)" outlined />
                <Heading className={onboardingModalContentTitleStyles} size={Size.MD} marginTop={24}>
                    Code Nodes
                </Heading>
            </div>
            <p>
                Want to build some complicated logic, without having to setup a lot of nodes? We've got you covered. The
                GLSL Node allows you to provide a GLSL function - which automatically will be converted to a Node which
                is compatible with all other nodes in your circuit.
            </p>
            <p>{'You can find this Node under Common > GLSL in the Node browser.'}</p>
        </div>
    );
};

const WelcomeOnboarding4 = () => {
    return (
        <div className={onboardingModalContentStyles}>
            <div className={onboardingModalImageStyles('/assets/images/toolbar.png')} />
            <div className={onboardingModalContentHeadingStyles}>
                <Icon name="construction" size={32} color="var(--accent-color)" outlined />
                <Heading className={onboardingModalContentTitleStyles} size={Size.MD} marginTop={24}>
                    Toolbar
                </Heading>
            </div>
            <p>
                You can find some handy utilities in the toolbar. This is where you can view the final GLSL code.Use the
                examples menu to get some inspiration on what you can create. Or use the "New Node" CTA button to start
                deploying nodes on your circuit. The fourth button opens up a window where you can import / export a
                serialized circuit. Lastly - use the Fullscreen-button to view your creation on the big screen.
            </p>
            <p>
                Alright, I think you're getting the hang of it. Time to let you loose. Have fun, and please be a aware
                that this is very much alpha-software. There will be bugs. Good luck!
            </p>
        </div>
    );
};

export const useWelcomeModal = () => {
    const modal = React.useContext(ModalContext);

    const openWelcome = React.useCallback(
        ({ onClose }: IWelcomeModalOpenProps) => {
            modal.queue({
                id: WELCOME_MODAL_ID,
                title: '',
                children: <WelcomeModalContent />,
                actions: [
                    {
                        label: 'Next',
                        onPress: () => {
                            modal.close(WELCOME_MODAL_ID);

                            setTimeout(() => {
                                openOnboardingStep1({ onClose });
                            }, 0);
                        }
                    }
                ]
            });
        },
        [modal]
    );

    const openOnboardingStep1 = React.useCallback(
        ({ onClose }: IWelcomeModalOpenProps) => {
            modal.queue({
                id: WELCOME_MODAL_ID,
                title: '',
                children: <WelcomeOnboarding1 />,
                actions: [
                    {
                        label: 'Next',
                        onPress: () => {
                            modal.close(WELCOME_MODAL_ID);

                            setTimeout(() => {
                                openOnboardingStep2({ onClose });
                            }, 0);
                        }
                    }
                ]
            });
        },
        [modal]
    );

    const openOnboardingStep2 = React.useCallback(
        ({ onClose }: IWelcomeModalOpenProps) => {
            modal.queue({
                id: WELCOME_MODAL_ID,
                title: '',
                children: <WelcomeOnboarding2 />,
                actions: [
                    {
                        label: 'Next',
                        onPress: () => {
                            modal.close(WELCOME_MODAL_ID);

                            setTimeout(() => {
                                openOnboardingStep3({ onClose });
                            }, 0);
                        }
                    }
                ]
            });
        },
        [modal]
    );

    const openOnboardingStep3 = React.useCallback(
        ({ onClose }: IWelcomeModalOpenProps) => {
            modal.queue({
                id: WELCOME_MODAL_ID,
                title: '',
                children: <WelcomeOnboarding3 />,
                actions: [
                    {
                        label: `Next`,
                        onPress: () => {
                            modal.close(WELCOME_MODAL_ID);

                            setTimeout(() => {
                                openOnboardingStep4({ onClose });
                            }, 0);
                        }
                    }
                ]
            });
        },
        [modal]
    );

    const openOnboardingStep4 = React.useCallback(
        ({ onClose }: IWelcomeModalOpenProps) => {
            modal.queue({
                id: WELCOME_MODAL_ID,
                title: '',
                children: <WelcomeOnboarding4 />,
                actions: [
                    {
                        label: `Get Started`,
                        onPress: () => {
                            modal.close(WELCOME_MODAL_ID);
                            onClose?.();
                        }
                    }
                ]
            });
        },
        [modal]
    );

    return {
        open: openWelcome,
        close: modal.close
    };
};
