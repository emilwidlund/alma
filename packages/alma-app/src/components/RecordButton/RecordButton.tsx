import React, { useCallback, useEffect, useRef } from 'react';
import { TouchableOpacity, View, Animated, GestureResponderEvent } from 'react-native';
import Svg, { Circle, CircleProps } from 'react-native-svg';

import { IRecordButtonProps } from './RecordButton.types';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const RecordButton = ({ size, strokeWidth = 5, onStart, onEnd }: IRecordButtonProps) => {
    const progressCircleRef = useRef<
        Animated.AnimatedComponent<Circle> & {
            setNativeProps: (props: CircleProps) => void;
        }
    >(null);
    const animatedProgress = useRef(new Animated.Value(0)).current;
    const animatedProgressOpacity = useRef(new Animated.Value(0)).current;
    const longPressDelayHandle = useRef<NodeJS.Timeout>();

    const clickSize = size - strokeWidth - 20;
    const radius = (size - strokeWidth) / 2;
    const circum = radius * 2 * Math.PI;

    const startProgress = useCallback(() => {
        Animated.sequence([
            Animated.timing(animatedProgress, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(animatedProgressOpacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true
                }),
                Animated.timing(animatedProgress, {
                    toValue: 1,
                    duration: 5000,
                    easing: val => val,
                    useNativeDriver: true
                })
            ])
        ]).start();
    }, []);

    const endProgress = useCallback(() => {
        animatedProgress.stopAnimation();
        animatedProgressOpacity.stopAnimation();

        Animated.timing(animatedProgressOpacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
        }).start();
    }, []);

    const handlePress = useCallback(
        (e: GestureResponderEvent) => {
            longPressDelayHandle.current = setTimeout(startProgress, 150);

            onStart?.(e);
        },
        [onStart, startProgress]
    );

    const handlePressEnd = useCallback(
        (e: GestureResponderEvent) => {
            clearTimeout(longPressDelayHandle.current);

            endProgress();

            onEnd?.(e);
        },
        [onEnd, endProgress]
    );

    useEffect(() => {
        const progressHandle = animatedProgress.addListener(progress => {
            if (progress.value === 1) {
                endProgress();
            }

            progressCircleRef.current?.setNativeProps({
                strokeDashoffset: radius * Math.PI * 2 * (1 - progress.value)
            });
        });

        const progressOpacityHandle = animatedProgressOpacity.addListener(opacity => {
            progressCircleRef.current?.setNativeProps({
                opacity: opacity.value
            });
        });

        return () => {
            animatedProgress.removeListener(progressHandle);
            animatedProgressOpacity.removeListener(progressOpacityHandle);
        };
    }, []);

    return (
        <View>
            <Svg width={size} height={size}>
                <AnimatedCircle
                    ref={progressCircleRef}
                    stroke={'#fff'}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeDasharray={`${circum} ${circum}`}
                    strokeDashoffset={radius * Math.PI * 2}
                    strokeLinecap="round"
                    transform={`rotate(-90, ${size / 2}, ${size / 2})`}
                    {...{ strokeWidth }}
                />

                <Circle
                    stroke={'rgba(255, 255, 255, .1)'}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    {...{ strokeWidth }}
                />
            </Svg>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: (size - clickSize) / 2,
                    left: (size - clickSize) / 2,
                    width: clickSize,
                    height: clickSize,
                    borderRadius: size / 2,
                    backgroundColor: '#fff'
                }}
                onPressIn={handlePress}
                onPressOut={handlePressEnd}
            />
        </View>
    );
};
