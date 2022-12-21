import { MaterialIcons } from '@expo/vector-icons';
import { GLView } from 'expo-gl';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { RecordButton } from '../../components/RecordButton/RecordButton';
import { useArtboardContext } from '../../hooks/useArtboardContext/useArtboardContext';
import { styles } from './ArtboardPage.styles';
import { ArtboardPageProps } from './ArtboardPage.types';

export const ArtboardPage = ({ route: { params } }: ArtboardPageProps) => {
    const { glRef, onContextCreate } = useArtboardContext();

    return (
        <View style={styles.container}>
            <GLView ref={glRef} style={StyleSheet.absoluteFill} onContextCreate={onContextCreate} />
            <View style={styles.actions}>
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <MaterialIcons name="lightbulb" size={32} color="#fff" />
                </TouchableOpacity>
                <RecordButton size={100} />
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <MaterialIcons name="sync" size={32} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
