import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GLView } from 'expo-gl';
import { Camera, CameraType } from 'expo-camera';

import { styles } from './ArtboardPage.styles';
import { useArtboardContext } from '../../hooks/useArtboardContext/useArtboardContext';
import { RecordButton } from '../../components/RecordButton/RecordButton';
import {
    VERTEX as vertexShaderSource,
    FRAGMENT as fragmentShaderSource,
    KALEIDOSCOPE as kaleidoscopeShaderSource
} from '../../shaders/camera';

export const ArtboardPage = () => {
    const [cameraType, setCameraType] = useState(CameraType.back);
    const { glRef, cameraRef, onContextCreate } = useArtboardContext(vertexShaderSource, fragmentShaderSource);

    const switchCameraType = useCallback(() => {
        setCameraType(type => (type === CameraType.back ? CameraType.front : CameraType.back));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <Camera ref={cameraRef} style={{ display: 'none' }} type={cameraType} pictureSize="1920x1080" />
            <GLView ref={glRef} style={StyleSheet.absoluteFill} onContextCreate={onContextCreate} />
            <View style={styles.actions}>
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#fff'
                    }}
                    onPress={switchCameraType}
                />
                <RecordButton size={100} />
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#fff'
                    }}
                    onPress={switchCameraType}
                />
            </View>
        </SafeAreaView>
    );
};
