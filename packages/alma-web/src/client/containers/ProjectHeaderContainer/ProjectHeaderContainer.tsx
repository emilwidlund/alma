import { useMutation } from '@apollo/client';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Mutation } from '../../../generated/graphql';
import UPDATE_PROJECT_MUTATION from '../../apollo/mutations/updateProject.gql';
import GET_PROJECT_QUERY from '../../apollo/queries/getProject.gql';
import GET_USER_QUERY from '../../apollo/queries/getUser.gql';
import PROFILE_QUERY from '../../apollo/queries/profile.gql';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { ButtonVariant } from '../../components/Button/Button.types';
import { Heading } from '../../components/Heading/Heading';
import { Size } from '../../types';
import {
    projectHeaderContainerActionsStyles,
    projectHeaderContainerInfoStyles,
    projectHeaderContainerInfoTextStyles,
    projectHeaderContainerMetaStyles,
    projectHeaderContainerWrapperStyles
} from './ProjectHeaderContainer.styles';
import { IProjectHeaderContainerProps } from './ProjectHeaderContainer.types';

export const ProjectHeaderContainer = ({
    project,
    circuit,
    source,
    isDirty,
    setIsDirty
}: IProjectHeaderContainerProps) => {
    const navigate = useNavigate();
    const [updateProject, { loading: updateLoading }] = useMutation<Mutation>(UPDATE_PROJECT_MUTATION, {
        variables: { id: project.id },
        refetchQueries: [GET_PROJECT_QUERY, GET_USER_QUERY, PROFILE_QUERY]
    });

    const handleUpdateProject = React.useCallback(async () => {
        const mediaUrl = circuit ? (circuit.ctx.canvas as HTMLCanvasElement).toDataURL('image/jpeg') : undefined;

        const sourceOrCircuit =
            project.type === 'SHADER_SOURCE' ? { source } : { circuit: JSON.parse(JSON.stringify(circuit)) };

        const { data } = await updateProject({
            variables: { id: project.id, mediaUrl, ...sourceOrCircuit }
        });

        if (data?.updateProject) {
            setIsDirty(false);
        }
    }, [updateProject, project, circuit, source, setIsDirty]);

    const handleNavigateBack = React.useCallback(() => {
        if (isDirty) {
            const forceNavigate = confirm(
                'Changes have been made, but not saved. Work might be lost. Want to continue?'
            );

            if (forceNavigate) {
                navigate(-1);
                window.onbeforeunload = null;
            }
        } else {
            navigate(-1);
            window.onbeforeunload = null;
        }
    }, [navigate, isDirty]);

    React.useEffect(() => {
        if (isDirty) {
            window.onbeforeunload = e => {
                e.preventDefault();

                return (e.returnValue = 'Changes have been made, but not saved. Work might be lost. Want to continue?');
            };
        } else {
            window.onbeforeunload = null;
        }
    }, [isDirty]);

    return (
        <div className={projectHeaderContainerWrapperStyles}>
            <div className={projectHeaderContainerInfoStyles}>
                <Button icon="west" variant={ButtonVariant.SECONDARY} onPress={handleNavigateBack} />
                <div className={projectHeaderContainerInfoTextStyles}>
                    <span>{project.owner.name}</span>
                    <Heading size={Size.SM} marginTop={8} marginBottom={0}>
                        {project.name}
                    </Heading>
                </div>
            </div>
            <div className={projectHeaderContainerMetaStyles}>
                <div className={projectHeaderContainerActionsStyles}>
                    <Button
                        icon="save"
                        label="Save"
                        loading={updateLoading}
                        onPress={handleUpdateProject}
                        disabled={!isDirty}
                    />
                </div>
                <div>
                    <Avatar media={project.owner.mediaUrl} size={Size.SM} />
                </div>
            </div>
        </div>
    );
};
