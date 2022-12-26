import { useMutation } from '@apollo/client';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Mutation } from '../../../generated/graphql';
import CREATE_PROJECT_MUTATION from '../../apollo/mutations/createProject.gql';
import GET_USER_QUERY from '../../apollo/queries/getUser.gql';
import PROFILE_QUERY from '../../apollo/queries/profile.gql';
import { Heading } from '../../components/Heading/Heading';
import { Icon } from '../../components/Icon/Icon';
import { CREATE_PROJECT_MODAL_ID } from '../../constants/modals';
import { ModalContext } from '../../providers/ModalProvider/ModalProvider';
import { Size } from '../../types';
import {
    createProjectContentWrapperStyles,
    createProjectSelectionWrapperStyles,
    selectionBoxWrapperStyles
} from './useCreateProjectModal.styles';
import { ISelectionBoxProps } from './useCreateProjectModal.types';

const defaultSource = `void main() {
    // Time varying pixel color
    vec3 col = 0.5 + 0.5 * cos(time + v_uv.xyx + vec3(0., 2., 4.));

    // Output to screen
    fragColor = vec4(col, 1.0);
}`;

const SelectionBox = ({ icon, title, onClick }: ISelectionBoxProps) => {
    return (
        <div className={selectionBoxWrapperStyles} onClick={onClick}>
            <Icon name={icon} size={48} color="var(--accent-color)" />
            <Heading size={Size.SM} marginBottom={0} marginTop={32}>
                {title}
            </Heading>
        </div>
    );
};

const CreateProjectModalContent = () => {
    const modal = React.useContext(ModalContext);
    const { username } = useParams();
    const navigate = useNavigate();
    const [createProject] = useMutation<Mutation>(CREATE_PROJECT_MUTATION, {
        refetchQueries: [GET_USER_QUERY, PROFILE_QUERY]
    });

    const handleCreateCircuitProject = React.useCallback(async () => {
        const { data } = await createProject({
            variables: { name: 'Untitled', type: 'SHADER_CIRCUIT', circuit: {}, private: false }
        });

        modal.close(CREATE_PROJECT_MODAL_ID);

        navigate(`/${username}/${data?.createProject.id}/circuit`);
    }, [createProject, modal, navigate, username]);

    const handleCreateSourceProject = React.useCallback(async () => {
        const { data } = await createProject({
            variables: { name: 'Untitled', type: 'SHADER_SOURCE', source: defaultSource, private: false }
        });

        modal.close(CREATE_PROJECT_MODAL_ID);

        navigate(`/${username}/${data?.createProject.id}/source`);
    }, [createProject, modal, navigate, username]);

    return (
        <div className={createProjectContentWrapperStyles}>
            <Heading size={Size.MD} marginBottom={8}>
                Create Project
            </Heading>
            <p>Select which kind of project you would like to create. Project type cannot be changed once created.</p>
            <div className={createProjectSelectionWrapperStyles}>
                <SelectionBox icon="stream" title="Circuit" onClick={handleCreateCircuitProject} />
                <SelectionBox icon="code" title="GLSL Code" onClick={handleCreateSourceProject} />
            </div>
        </div>
    );
};

export const useCreateProjectModal = () => {
    const modal = React.useContext(ModalContext);

    const open = React.useCallback(() => {
        modal.queue({
            id: CREATE_PROJECT_MODAL_ID,
            title: 'Create Project',
            children: <CreateProjectModalContent />
        });
    }, [modal]);

    return {
        open,
        close: modal.close
    };
};
