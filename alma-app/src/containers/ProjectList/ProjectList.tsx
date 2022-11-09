import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, View, Text } from 'react-native';

import { styles } from './ProjectList.styles';
import { IProjectListContainerProps, IProjectListItemProps } from './ProjectList.types';
import { RootStackParamList } from '../../../App';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';


export const ProjectListContainer = ({ header, projects }: IProjectListContainerProps) => {
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

    const createProjectItemPressHandler = useCallback(
        ({ vertexShaderSource, fragmentShaderSource }: IProjectListItemProps) => {
            return () => {
                navigate('Artboard', { vertexShaderSource, fragmentShaderSource });
            };
        },
        []
    );

    return (
        <FlatList
            contentInset={{ bottom: 120 }}
            ListHeaderComponent={<View style={styles.headingContainer}>{header}</View>}
            style={styles.container}
            data={projects}
            renderItem={({ item }) => <ProjectCard {...item} onPress={createProjectItemPressHandler(item)} />}
            keyExtractor={item => item.title.replaceAll(' ', '-')}
        />
    );
};
