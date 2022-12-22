import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, View } from 'react-native';

import { RootStackParamList } from '../../../App';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { styles } from './ProjectList.styles';
import { IProjectListContainerProps } from './ProjectList.types';

export const ProjectListContainer = ({ header, projects }: IProjectListContainerProps) => {
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <FlatList
            contentInset={{ bottom: 120 }}
            ListHeaderComponent={<View style={styles.headingContainer}>{header}</View>}
            style={styles.container}
            data={projects}
            renderItem={({ item }) => (
                <ProjectCard title={item.name} media={item.mediaUrl || ''} lastModified={item.updatedAt} />
            )}
            keyExtractor={item => item.id}
        />
    );
};
