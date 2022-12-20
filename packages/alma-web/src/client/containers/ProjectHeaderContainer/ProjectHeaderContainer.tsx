import { useMutation } from '@apollo/client';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Mutation } from '../../../generated/graphql';
import UPDATE_PROJECT_MUTATION from '../../apollo/mutations/updateProject.gql';
import GET_PROJECT_QUERY from '../../apollo/queries/getProject.gql';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { ButtonVariant } from '../../components/Button/Button.types';
import { Heading } from '../../components/Heading/Heading';
import { useCircuit } from '../../hooks/useCircuit/useCircuit';
import { Size } from '../../types';
import {
    projectHeaderContainerActionsStyles,
    projectHeaderContainerInfoStyles,
    projectHeaderContainerInfoTextStyles,
    projectHeaderContainerMetaStyles,
    projectHeaderContainerWrapperStyles
} from './ProjectHeaderContainer.styles';
import { IProjectHeaderContainerProps } from './ProjectHeaderContainer.types';

export const ProjectHeaderContainer = ({ project }: IProjectHeaderContainerProps) => {
    const navigate = useNavigate();
    const circuit = useCircuit();
    const [updateProject] = useMutation<Mutation>(UPDATE_PROJECT_MUTATION, {
        variables: { id: project.id },
        refetchQueries: [GET_PROJECT_QUERY]
    });

    const handleUpdateProject = React.useCallback(async () => {
        if (circuit.context) {
            const { data } = await updateProject({
                variables: { id: project.id, circuit: JSON.parse(JSON.stringify(circuit.context)) }
            });

            if (data?.updateProject) {
                window.onbeforeunload = null;
            }
        }
    }, [updateProject, project, circuit]);

    return (
        <div className={projectHeaderContainerWrapperStyles}>
            <div className={projectHeaderContainerInfoStyles}>
                <Button label="Back" variant={ButtonVariant.SECONDARY} onPress={() => navigate('..')} />
                <div className={projectHeaderContainerInfoTextStyles}>
                    <span>{project.owner.name}</span>
                    <Heading size={Size.SM} marginTop={8} marginBottom={0}>
                        {project.name}
                    </Heading>
                </div>
            </div>
            <div className={projectHeaderContainerMetaStyles}>
                <div className={projectHeaderContainerActionsStyles}>
                    <Button label="Save" onPress={handleUpdateProject} />
                </div>
                <div>
                    <Avatar media={project.owner.mediaUrl} size={Size.SM} />
                </div>
            </div>
        </div>
    );
};
