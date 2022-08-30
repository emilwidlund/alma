import * as React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

import { styles } from './ProfilePage.styles';
import { ProjectListContainer } from '../../containers/ProjectList/ProjectList';
import { ProfilePageProps } from './ProfilePage.types';
import { IProjectListItemProps } from '../../containers/ProjectList/ProjectList.types';
import {
    VERTEX as vertexShaderSource,
    FRAGMENT as fragmentShaderSource,
    KALEIDOSCOPE as kaleidoscopeShaderSource,
    INVERT as invertShaderSource
} from '../../shaders/camera';

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

export const ProfilePage = ({ navigation }: ProfilePageProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <ProjectListContainer
                header={
                    <View>
                        <View
                            style={{
                                width: 100,
                                height: 100,
                                backgroundColor: '#fff',
                                borderRadius: 50,
                                shadowRadius: 10,
                                shadowOpacity: 0.15,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 0 }
                            }}
                        >
                            <Image
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    borderWidth: 2,
                                    borderColor: '#fff'
                                }}
                                source={{
                                    uri: 'https://pbs.twimg.com/profile_images/1543286859828174849/2JmJgBEK_400x400.jpg'
                                }}
                            />
                        </View>
                        <Text style={{ fontSize: 32, marginTop: 30 }}>Emil Widlund</Text>
                        <Text style={{ fontSize: 18, marginTop: 20, lineHeight: 26 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae mattis diam, at
                            efficitur magna. Suspendisse hendrerit turpis diam.
                        </Text>
                    </View>
                }
                projects={PROJECTS}
            />
        </SafeAreaView>
    );
};
