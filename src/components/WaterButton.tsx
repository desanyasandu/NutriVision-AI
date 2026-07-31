import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Animated,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient, Stop, Path, Circle, G } from 'react-native-svg';
import { COLORS } from '../theme/colors';

export type WaterVariant = 'cyan' | 'emerald' | 'purple' | 'ocean' | 'coral';

export interface WaterButtonProps {
  title?: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: WaterVariant;
  size?: 'sm' | 'md' | 'lg';
  fullness?: number; // 0.2 to 0.8
  children?: React.ReactNode;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const WaterButton: React.FC<WaterButtonProps> = ({
  title,
  onPress,
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
  variant = 'cyan',
  size = 'md',
  fullness = 0.55,
  children,
}) => {
  const [dimensions, setDimensions] = useState({ width: 240, height: 52 });
  
  // Animation drivers
  const phaseAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bubbleY1 = useRef(new Animated.Value(0)).current;
  const bubbleY2 = useRef(new Animated.Value(0)).current;
  const bubbleY3 = useRef(new Animated.Value(0)).current;

  // Fluid loop animation
  useEffect(() => {
    // Wave phase animation loop
    const waveLoop = Animated.loop(
      Animated.timing(phaseAnim, {
        toValue: 1,
        duration: 3200,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );

    // Floating micro-bubbles loops
    const b1 = Animated.loop(
      Animated.timing(bubbleY1, {
        toValue: 1,
        duration: 2200,
        easing: Easing.ease,
        useNativeDriver: false,
      })
    );

    const b2 = Animated.loop(
      Animated.timing(bubbleY2, {
        toValue: 1,
        duration: 2900,
        easing: Easing.ease,
        useNativeDriver: false,
      })
    );

    const b3 = Animated.loop(
      Animated.timing(bubbleY3, {
        toValue: 1,
        duration: 2500,
        easing: Easing.ease,
        useNativeDriver: false,
      })
    );

    waveLoop.start();
    b1.start();
    b2.start();
    b3.start();

    return () => {
      waveLoop.stop();
      b1.stop();
      b2.stop();
      b3.stop();
    };
  }, [phaseAnim, bubbleY1, bubbleY2, bubbleY3]);

  // Handle Press dynamics (liquid compression & spring scale)
  const handlePressIn = () => {
    if (disabled || loading) return;
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 40,
      bounciness: 2,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled || loading) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 24,
      bounciness: 9,
    }).start();
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setDimensions({ width, height });
    }
  };

  // Color schemes for water variants
  const getTheme = () => {
    switch (variant) {
      case 'emerald':
        return {
          water1: '#00E5A3',
          water2: '#009E71',
          waterBack: 'rgba(0,229,163,0.35)',
          glow: '#00C48C',
          bgDark: '#04281E',
          glassBorder: 'rgba(0, 229, 163, 0.4)',
        };
      case 'purple':
        return {
          water1: '#A855F7',
          water2: '#6B21A8',
          waterBack: 'rgba(168,85,247,0.35)',
          glow: '#8B5CF6',
          bgDark: '#1E0B36',
          glassBorder: 'rgba(168, 85, 247, 0.4)',
        };
      case 'ocean':
        return {
          water1: '#38BDF8',
          water2: '#0284C7',
          waterBack: 'rgba(56,189,248,0.35)',
          glow: '#0EA5E9',
          bgDark: '#0C2A4A',
          glassBorder: 'rgba(56, 189, 248, 0.4)',
        };
      case 'coral':
        return {
          water1: '#FF6B8B',
          water2: '#D93D58',
          waterBack: 'rgba(255,107,139,0.35)',
          glow: '#FF5C7A',
          bgDark: '#380D17',
          glassBorder: 'rgba(255, 107, 139, 0.4)',
        };
      default: // cyan
        return {
          water1: '#06B6D4',
          water2: '#0284C7',
          waterBack: 'rgba(6,182,212,0.38)',
          glow: '#06B6D4',
          bgDark: '#082F49',
          glassBorder: 'rgba(6, 182, 212, 0.4)',
        };
    }
  };

  const theme = getTheme();

  const getHeight = () => {
    switch (size) {
      case 'sm': return 44;
      case 'lg': return 58;
      default: return 52;
    }
  };

  const h = getHeight();
  const w = dimensions.width;
  const waterY = h * (1 - fullness);

  // Dynamic SVG path interpolation for front wave and back wave
  const frontWavePath = phaseAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      `M 0 ${waterY} Q ${w * 0.25} ${waterY - 8} ${w * 0.5} ${waterY} T ${w} ${waterY} L ${w} ${h} L 0 ${h} Z`,
      `M 0 ${waterY} Q ${w * 0.25} ${waterY + 8} ${w * 0.5} ${waterY} T ${w} ${waterY} L ${w} ${h} L 0 ${h} Z`,
      `M 0 ${waterY} Q ${w * 0.25} ${waterY - 8} ${w * 0.5} ${waterY} T ${w} ${waterY} L ${w} ${h} L 0 ${h} Z`,
    ],
  });

  const backWavePath = phaseAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      `M 0 ${waterY - 3} Q ${w * 0.25} ${waterY + 6} ${w * 0.5} ${waterY - 3} T ${w} ${waterY - 3} L ${w} ${h} L 0 ${h} Z`,
      `M 0 ${waterY - 3} Q ${w * 0.25} ${waterY - 6} ${w * 0.5} ${waterY - 3} T ${w} ${waterY - 3} L ${w} ${h} L 0 ${h} Z`,
      `M 0 ${waterY - 3} Q ${w * 0.25} ${waterY + 6} ${w * 0.5} ${waterY - 3} T ${w} ${waterY - 3} L ${w} ${h} L 0 ${h} Z`,
    ],
  });

  // Animated bubble coordinates
  const b1Y = bubbleY1.interpolate({ inputRange: [0, 1], outputRange: [h - 4, waterY - 4] });
  const b2Y = bubbleY2.interpolate({ inputRange: [0, 1], outputRange: [h - 2, waterY - 6] });
  const b3Y = bubbleY3.interpolate({ inputRange: [0, 1], outputRange: [h - 6, waterY - 2] });

  const b1Opacity = bubbleY1.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 0.7, 0.7, 0] });
  const b2Opacity = bubbleY2.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 0.6, 0.6, 0] });
  const b3Opacity = bubbleY3.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 0.8, 0.8, 0] });

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Animated.View
        style={[
          styles.container,
          {
            height: h,
            borderColor: theme.glassBorder,
            shadowColor: theme.glow,
          },
          disabled && styles.disabled,
          style,
          { transform: [{ scale: scaleAnim }] },
        ]}
        onLayout={handleLayout}
      >
        {/* Background Deep Liquid Container */}
        <View style={[styles.bgContainer, { backgroundColor: theme.bgDark }]}>
          <Svg width={w} height={h} style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id={`waterGrad_${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={theme.water1} stopOpacity="0.9" />
                <Stop offset="100%" stopColor={theme.water2} stopOpacity="0.98" />
              </LinearGradient>
              <LinearGradient id={`waterBackGrad_${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={theme.water1} stopOpacity="0.4" />
                <Stop offset="100%" stopColor={theme.water2} stopOpacity="0.6" />
              </LinearGradient>
            </Defs>

            {/* Back Wave Layer */}
            <AnimatedPath d={backWavePath} fill={`url(#waterBackGrad_${variant})`} />

            {/* Front Wave Layer */}
            <AnimatedPath d={frontWavePath} fill={`url(#waterGrad_${variant})`} />

            {/* Micro Bubbles */}
            <G>
              <AnimatedCircle cx={w * 0.2} cy={b1Y} r={2.5} fill="#FFFFFF" opacity={b1Opacity} />
              <AnimatedCircle cx={w * 0.55} cy={b2Y} r={1.8} fill="#FFFFFF" opacity={b2Opacity} />
              <AnimatedCircle cx={w * 0.8} cy={b3Y} r={2.2} fill="#FFFFFF" opacity={b3Opacity} />
            </G>
          </Svg>

          {/* Frosted Top Specular Reflection Highlight */}
          <View style={styles.topSpecularHighlight} />
        </View>

        {/* Content Overlay */}
        <View style={styles.contentOverlay}>
          {loading ? (
            <ActivityIndicator color={COLORS.white} size="small" />
          ) : children ? (
            children
          ) : (
            <>
              {icon && <Ionicons name={icon} size={19} color={COLORS.white} style={styles.iconStyle} />}
              <Text style={[styles.buttonText, textStyle]}>{title}</Text>
            </>
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    position: 'relative',
    marginVertical: 6,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  bgContainer: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  topSpecularHighlight: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 1,
  },
  contentOverlay: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 8,
    zIndex: 10,
  },
  iconStyle: {
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  disabled: {
    opacity: 0.45,
  },
});
