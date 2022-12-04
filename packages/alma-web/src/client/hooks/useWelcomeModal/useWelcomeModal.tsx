import * as React from 'react';

import { Heading } from '../../components/Heading/Heading';
import { Icon } from '../../components/Icon/Icon';
import { WELCOME_MODAL_ID } from '../../constants/modals';
import { ModalContext } from '../../providers/ModalProvider/ModalProvider';
import { Size } from '../../types';
import { welcomeModalContentStyles, welcomeModalContentTitleStyles } from './useWelcomeModal.styles';
import { IWelcomeModalOpenProps } from './useWelcomeModal.types';

const WelcomeModalContent = () => {
    return (
        <div className={welcomeModalContentStyles}>
            <Icon name="stream" size={64} color="var(--accent-color)" />
            <Heading className={welcomeModalContentTitleStyles} size={Size.LG}>
                Welcome to Alma
            </Heading>
            <p>
                Alma is an interactive playground for generative graphics. It lets you assemble nodes to craft beautiful
                effects and effects - all through an intuitive user interface.
            </p>
            <p>
                This is a very early preview version.
                <br />
                Any questions or feedback can be sent to me on{' '}
                <a href="https://twitter.com/emilwidlund" target="_blank">
                    Twitter
                </a>
            </p>
        </div>
    );
};

export const useWelcomeModal = () => {
    const modal = React.useContext(ModalContext);

    const open = React.useCallback(
        ({ onClose }: IWelcomeModalOpenProps) => {
            modal.queue({
                id: WELCOME_MODAL_ID,
                title: '',
                children: <WelcomeModalContent />,
                actions: [
                    {
                        label: 'Get Started',
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
        open,
        close: modal.close
    };
};
