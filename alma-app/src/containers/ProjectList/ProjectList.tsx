import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, View, Text } from 'react-native';

import { RootStackParamList } from '../../../App';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { styles } from './ProjectList.styles';

import { IProjectListContainerProps, IProjectListItemProps } from './ProjectList.types';

export const ProjectListContainer = ({ projects }: IProjectListContainerProps) => {
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
            ListHeaderComponent={
                <View style={styles.headingContainer}>
                    <MaterialIcons name="stream" size={28} />
                    <Text style={styles.title}>My Projects</Text>
                </View>
            }
            style={styles.container}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            numColumns={2}
            data={projects}
            renderItem={({ item }) => <ProjectCard {...item} onPress={createProjectItemPressHandler(item)} />}
            keyExtractor={item => item.title.replaceAll(' ', '-')}
        />
    );
};
