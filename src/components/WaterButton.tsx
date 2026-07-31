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

export type WaterVariant = 'cyan' | 'emerald' | 'purple' | 'ocean' | 'coral' | 'primary';

export interface WaterButtonProps {
  title?: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: WaterVariant;
  transparent?: boolean; // Glassmorphic transparent backdrop
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
  variant = 'primary',
  transparent = true,
  size = 'md',
  fullness = 0.65,
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
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );

    // Floating micro-bubbles loops
    const b1 = Animated.loop(
      Animated.timing(bubbleY1, {
        toValue: 1,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: false,
      })
    );

    const b2 = Animated.loop(
      Animated.timing(bubbleY2, {
        toValue: 1,
        duration: 2700,
        easing: Easing.ease,
        useNativeDriver: false,
      })
    );

    const b3 = Animated.loop(
      Animated.timing(bubbleY3, {
        toValue: 1,
        duration: 2300,
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

  // Handle Press dynamics
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

  // Color schemes for transparent water variants
  const getTheme = () => {
    switch (variant) {
      case 'emerald':
        return {
          water1: '#00E5A3',
          water2: '#009E71',
          glow: '#00C48C',
          bgDark: transparent ? 'rgba(0, 196, 140, 0.12)' : '#04281E',
          glassBorder: 'rgba(0, 229, 163, 0.5)',
        };
      case 'purple':
        return {
          water1: '#A855F7',
          water2: '#6B21A8',
          glow: '#8B5CF6',
          bgDark: transparent ? 'rgba(123, 97, 255, 0.15)' : '#1E0B36',
          glassBorder: 'rgba(168, 85, 247, 0.5)',
        };
      case 'ocean':
        return {
          water1: '#38BDF8',
          water2: '#0284C7',
          glow: '#0EA5E9',
          bgDark: transparent ? 'rgba(14, 165, 233, 0.14)' : '#0C2A4A',
          glassBorder: 'rgba(56, 189, 248, 0.5)',
        };
      case 'coral':
        return {
          water1: '#FF6B8B',
          water2: '#D93D58',
          glow: '#FF5C7A',
          bgDark: transparent ? 'rgba(255, 92, 122, 0.15)' : '#380D17',
          glassBorder: 'rgba(255, 107, 139, 0.5)',
        };
      case 'cyan':
        return {
          water1: '#06B6D4',
          water2: '#0284C7',
          glow: '#06B6D4',
          bgDark: transparent ? 'rgba(6, 182, 212, 0.15)' : '#082F49',
          glassBorder: 'rgba(6, 182, 212, 0.5)',
        };
      default: // primary blue
        return {
          water1: '#4F6EF7',
          water2: '#2743D4',
          glow: '#4F6EF7',
          bgDark: transparent ? 'rgba(79, 110, 247, 0.18)' : '#10194A',
          glassBorder: 'rgba(79, 110, 247, 0.55)',
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

  // Dynamic SVG wave path interpolations
  const frontWavePath = phaseAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      `M 0 ${waterY} Q ${w * 0.25} ${waterY - 7} ${w * 0.5} ${waterY} T ${w} ${waterY} L ${w} ${h} L 0 ${h} Z`,
      `M 0 ${waterY} Q ${w * 0.25} ${waterY + 7} ${w * 0.5} ${waterY} T ${w} ${waterY} L ${w} ${h} L 0 ${h} Z`,
      `M 0 ${waterY} Q ${w * 0.25} ${waterY - 7} ${w * 0.5} ${waterY} T ${w} ${waterY} L ${w} ${h} L 0 ${h} Z`,
    ],
  });

  const backWavePath = phaseAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      `M 0 ${waterY - 3} Q ${w * 0.25} ${waterY + 5} ${w * 0.5} ${waterY - 3} T ${w} ${waterY - 3} L ${w} ${h} L 0 ${h} Z`,
      `M 0 ${waterY - 3} Q ${w * 0.25} ${waterY - 5} ${w * 0.5} ${waterY - 3} T ${w} ${waterY - 3} L ${w} ${h} L 0 ${h} Z`,
      `M 0 ${waterY - 3} Q ${w * 0.25} ${waterY + 5} ${w * 0.5} ${waterY - 3} T ${w} ${waterY - 3} L ${w} ${h} L 0 ${h} Z`,
    ],
  });

  // Animated bubble coordinates
  const b1Y = bubbleY1.interpolate({ inputRange: [0, 1], outputRange: [h - 4, waterY - 4] });
  const b2Y = bubbleY2.interpolate({ inputRange: [0, 1], outputRange: [h - 2, waterY - 6] });
  const b3Y = bubbleY3.interpolate({ inputRange: [0, 1], outputRange: [h - 6, waterY - 2] });

  const b1Opacity = bubbleY1.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 0.75, 0.75, 0] });
  const b2Opacity = bubbleY2.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 0.65, 0.65, 0] });
  const b3Opacity = bubbleY3.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 0.85, 0.85, 0] });

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
            backgroundColor: theme.bgDark,
          },
          disabled && styles.disabled,
          style,
          { transform: [{ scale: scaleAnim }] },
        ]}
        onLayout={handleLayout}
      >
        {/* Background Liquid Container */}
        <View style={styles.bgContainer}>
          <Svg width={w} height={h} style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id={`waterGrad_${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={theme.water1} stopOpacity={transparent ? "0.75" : "0.92"} />
                <Stop offset="100%" stopColor={theme.water2} stopOpacity={transparent ? "0.9" : "0.98"} />
              </LinearGradient>
              <LinearGradient id={`waterBackGrad_${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={theme.water1} stopOpacity={transparent ? "0.3" : "0.4"} />
                <Stop offset="100%" stopColor={theme.water2} stopOpacity={transparent ? "0.45" : "0.6"} />
              </LinearGradient>
            </Defs>

            {/* Back Wave Layer */}
            <AnimatedPath d={backWavePath} fill={`url(#waterBackGrad_${variant})`} />

            {/* Front Wave Layer */}
            <AnimatedPath d={frontWavePath} fill={`url(#waterGrad_${variant})`} />

            {/* Floating Micro Bubbles */}
            <G>
              <AnimatedCircle cx={w * 0.18} cy={b1Y} r={2.8} fill="#FFFFFF" opacity={b1Opacity} />
              <AnimatedCircle cx={w * 0.52} cy={b2Y} r={2.0} fill="#FFFFFF" opacity={b2Opacity} />
              <AnimatedCircle cx={w * 0.82} cy={b3Y} r={2.5} fill="#FFFFFF" opacity={b3Opacity} />
            </G>
          </Svg>

          {/* Frosted Top Edge Highlight */}
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
    borderWidth: 1.4,
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
    left: 10,
    right: 10,
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  disabled: {
    opacity: 0.45,
  },
});
