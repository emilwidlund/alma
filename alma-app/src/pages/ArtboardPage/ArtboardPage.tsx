import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { GLView } from 'expo-gl';
import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './ArtboardPage.styles';
import { ArtboardPageProps } from './ArtboardPage.types';
import { useArtboardContext } from '../../hooks/useArtboardContext/useArtboardContext';
import { RecordButton } from '../../components/RecordButton/RecordButton';

export const ArtboardPage = ({
    route: {
        params: { vertexShaderSource, fragmentShaderSource }
    }
}: ArtboardPageProps) => {
    const [cameraType, setCameraType] = useState(CameraType.back);
    const { glRef, cameraRef, onContextCreate } = useArtboardContext(vertexShaderSource, fragmentShaderSource);

    const switchCameraType = useCallback(() => {
        setCameraType(type => (type === CameraType.back ? CameraType.front : CameraType.back));
    }, []);

    return (
        <View style={styles.container}>
            <Camera ref={cameraRef} style={{ display: 'none' }} type={cameraType} pictureSize="1920x1080" />
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
                    onPress={switchCameraType}
                >
                    <MaterialIcons name="sync" size={32} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
