import { useQuery } from '@apollo/client';
import * as dayJS from 'dayjs';
import { capitalize } from 'lodash';
import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Query } from '../../../generated/graphql';
import GET_PROJECT_QUERY from '../../apollo/queries/getProject.gql';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { ButtonVariant } from '../../components/Button/Button.types';
import { Heading } from '../../components/Heading/Heading';
import { Scene } from '../../components/Scene/Scene';
import { useCircuitContext } from '../../hooks/useCircuitContext/useCircuitContext';
import { Size } from '../../types';
import {
    projectActionButtonsStyles,
    projectArtboardCanvasStyles,
    projectArtboardWrapperStyles,
    projectCloneButtonStyles,
    projectInfoPanelStyles,
    projectInfoSeparatorStyles,
    projectInfoUsernameStyles,
    projectRouteWrapperStyles
} from './ProjectRoute.styles';

export const ProjectRoute = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const navigate = useNavigate();
    const { username, projectId } = useParams();
    const { buildCircuit } = useCircuitContext(canvasRef);
    const { data: getProjectData } = useQuery<Query>(GET_PROJECT_QUERY, { variables: { id: projectId } });

    const updatedAgo = capitalize(dayJS(getProjectData?.getProject.updatedAt).fromNow(false));

    React.useEffect(() => {
        if (canvasRef.current) {
            const { width, height } = canvasRef.current.getBoundingClientRect();
            canvasRef.current.width = width;
            canvasRef.current.height = height;
        }
    }, []);

    React.useEffect(() => {
        if (getProjectData) {
            return buildCircuit(JSON.parse(JSON.stringify(getProjectData.getProject.circuit)));
        }
    }, [getProjectData]);

    return (
        <Scene>
            <div className={projectRouteWrapperStyles}>
                <div className={projectArtboardWrapperStyles}>
                    <canvas ref={canvasRef} className={projectArtboardCanvasStyles} />
                </div>
                <div className={projectInfoPanelStyles}>
                    <Avatar size={Size.MD} media={getProjectData?.getProject.owner.mediaUrl} />
                    <Heading size={Size.LG} marginTop={48} marginBottom={0}>
                        {getProjectData?.getProject.name}
                    </Heading>
                    <span className={projectInfoUsernameStyles}>
                        <Link to={`/${getProjectData?.getProject.owner.username}`}>
                            <span>@{getProjectData?.getProject.owner.username}</span>
                        </Link>
                        <span className={projectInfoSeparatorStyles}>{'·'}</span>
                        {updatedAgo}
                    </span>
                    <div className={projectActionButtonsStyles}>
                        <Button
                            label="View Circuit"
                            onPress={() =>
                                navigate(
                                    `/${username}/${projectId}/${
                                        getProjectData?.getProject.type === 'SHADER_SOURCE' ? 'source' : 'circuit'
                                    }`
                                )
                            }
                        />
                        <Button
                            className={projectCloneButtonStyles}
                            label="Fork Project"
                            variant={ButtonVariant.TERTIARY}
                        />
                    </div>
                </div>
            </div>
        </Scene>
    );
};
