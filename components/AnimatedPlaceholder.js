import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

const AnimatedPlaceholder = ({ width, height, style }) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: false }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 1000, useNativeDriver: false }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  const backgroundColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D3D3D3', '#A9A9A9'] // Light grey to dark grey
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor,
          borderRadius: 4,
        },
        style
      ]}
    />
  );
};

export default AnimatedPlaceholder;