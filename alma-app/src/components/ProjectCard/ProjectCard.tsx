import * as React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './ProjectCard.styles';

import { IProjectCardProps } from './ProjectCard.types';

export const ProjectCard = ({ title, lastModified, media, onPress }: IProjectCardProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.media} />
            <View style={styles.textContent}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{lastModified}</Text>
            </View>
        </TouchableOpacity>
    );
};
