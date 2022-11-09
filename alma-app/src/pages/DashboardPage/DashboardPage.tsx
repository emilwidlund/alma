import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { ProjectListContainer } from '../../containers/ProjectList/ProjectList';
import { IProjectListItemProps } from '../../containers/ProjectList/ProjectList.types';
import {
    VERTEX as vertexShaderSource,
    FRAGMENT as fragmentShaderSource,
    KALEIDOSCOPE as kaleidoscopeShaderSource,
    INVERT as invertShaderSource
} from '../../shaders/camera';
import { styles } from './DashboardPage.styles';
import { DashboardPageProps } from './DashboardPage.types';

const PROJECTS: IProjectListItemProps[] = [
    {
        title: 'Camera',
        lastModified: '3 minutes ago',
        media: '',
        vertexShaderSource,
        fragmentShaderSource
    },
    {
        title: 'Kaleidoscope',
        lastModified: '2 days ago',
        media: '',
        vertexShaderSource,
        fragmentShaderSource: kaleidoscopeShaderSource
    },
    {
        title: 'Invert',
        lastModified: '1 week ago',
        media: '',
        vertexShaderSource,
        fragmentShaderSource: invertShaderSource
    },
    {
        title: 'Kaleidoscope',
        lastModified: '2 days ago',
        media: '',
        vertexShaderSource,
        fragmentShaderSource: kaleidoscopeShaderSource
    },
    {
        title: 'Invert',
        lastModified: '1 week ago',
        media: '',
        vertexShaderSource,
        fragmentShaderSource: invertShaderSource
    }
];

export const DashboardPage = ({ navigation }: DashboardPageProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <ProjectListContainer
                header={
                    <>
                        <MaterialIcons name="stream" size={28} />
                        <Text style={styles.title}>My Projects</Text>
                    </>
                }
                projects={PROJECTS}
            />
        </SafeAreaView>
    );
};
