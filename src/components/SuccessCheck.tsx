import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../theme/colors';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export interface SuccessCheckProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  visible?: boolean;
  style?: ViewStyle;
}

export const SuccessCheck: React.FC<SuccessCheckProps> = ({
  size = 44,
  color = COLORS.secondary,
  strokeWidth = 4,
  visible = true,
  style,
}) => {
  // Transitions.dev physics parameters
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(80)).current;
  const translateYAnim = useRef(new Animated.Value(40)).current;
  const pathDrawAnim = useRef(new Animated.Value(1)).current; // 1 to 0 offset ratio

  useEffect(() => {
    if (visible) {
      // Reset values
      opacityAnim.setValue(0);
      rotateAnim.setValue(80);
      translateYAnim.setValue(40);
      pathDrawAnim.setValue(1);

      // Transitions.dev ease functions
      const easeOut = Easing.bezier(0.22, 1, 0.36, 1);
      const easeBob = Easing.bezier(0.34, 1.35, 0.64, 1);

      Animated.parallel([
        // Fade
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          easing: easeOut,
          useNativeDriver: true,
        }),
        // Rotate (80deg to 0deg)
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 500,
          easing: easeOut,
          useNativeDriver: true,
        }),
        // Y Bob (40px to 0px with spring overshoot)
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 500,
          easing: easeBob,
          useNativeDriver: true,
        }),
        // Stroke Path Draw (with 80ms delay)
        Animated.sequence([
          Animated.delay(80),
          Animated.timing(pathDrawAnim, {
            toValue: 0,
            duration: 500,
            easing: easeOut,
            useNativeDriver: false,
          }),
        ]),
      ]).start();
    } else {
      opacityAnim.setValue(0);
    }
  }, [visible, opacityAnim, rotateAnim, translateYAnim, pathDrawAnim]);

  const rotateStr = rotateAnim.interpolate({
    inputRange: [0, 80],
    outputRange: ['0deg', '80deg'],
  });

  const pathLength = 50;
  const dashOffset = pathDrawAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, pathLength],
  });

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          width: size,
          height: size,
          opacity: opacityAnim,
          transform: [
            { translateY: translateYAnim },
            { rotate: rotateStr },
          ],
        },
        style,
      ]}
    >
      <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {/* Outer Circular Glow Ring */}
        <Path
          d="M 24, 4 A 20,20 0 1,1 23.99,4"
          stroke={color + '30'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Animated Success Checkmark Path */}
        <AnimatedPath
          d="M14 25 L21 32 L34 16"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={dashOffset}
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
