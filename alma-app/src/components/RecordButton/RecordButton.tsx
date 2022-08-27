import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  Animated,
  GestureResponderEvent,
} from "react-native";
import Svg, { Circle, CircleProps } from "react-native-svg";

import { IRecordButtonProps } from "./RecordButton.types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const RecordButton = ({
  size,
  strokeWidth = 5,
  onStart,
  onEnd,
}: IRecordButtonProps) => {
  const progressCircleRef = useRef<
    Animated.AnimatedComponent<Circle> & {
      setNativeProps: (props: CircleProps) => void;
    }
  >(null);
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const longPressDelayHandle = useRef<NodeJS.Timeout>();

  const clickSize = size - strokeWidth - 15;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;

  const startProgress = useCallback(() => {
    Animated.timing(animatedProgress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, []);

  const endProgress = useCallback(() => {
    animatedProgress.stopAnimation();

    Animated.timing(animatedProgress, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
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
    const handle = animatedProgress.addListener((progress) => {
      if (progress.value === 1) {
        endProgress();
      }

      progressCircleRef.current?.setNativeProps({
        strokeDashoffset: radius * Math.PI * 2 * (1 - progress.value),
      });
    });

    return () => animatedProgress.removeListener(handle);
  }, []);

  return (
    <View>
      <Svg width={size} height={size}>
        <AnimatedCircle
          ref={progressCircleRef}
          stroke={"#fff"}
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
      </Svg>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: (size - clickSize) / 2,
          left: (size - clickSize) / 2,
          width: clickSize,
          height: clickSize,
          borderRadius: size / 2,
          backgroundColor: "#fff",
        }}
        onPressIn={handlePress}
        onPressOut={handlePressEnd}
      />
    </View>
  );
};
