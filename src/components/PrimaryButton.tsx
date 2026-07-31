import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { COLORS, SHADOWS } from '../theme/colors';
import { AnimatedPressable } from './AnimatedPressable';

import { WaterButton, WaterVariant } from './WaterButton';

interface PrimaryButtonProps {
  title: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'accent' | 'success' | 'danger' | 'dark';
  waterEffect?: boolean;
  waterVariant?: WaterVariant;
  size?: 'sm' | 'md' | 'lg';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
  variant = 'primary',
  waterEffect = false,
  waterVariant,
  size = 'md',
}) => {
  if (waterEffect) {
    const defaultWaterVariant: WaterVariant = 
      variant === 'success' ? 'emerald' :
      variant === 'accent' ? 'purple' :
      variant === 'danger' ? 'coral' : 'cyan';

    return (
      <WaterButton
        title={title}
        icon={icon}
        onPress={onPress}
        loading={loading}
        disabled={disabled}
        style={style}
        textStyle={textStyle}
        size={size}
        variant={waterVariant || defaultWaterVariant}
      />
    );
  }
  const getColors = () => {
    switch (variant) {
      case 'accent': return ['#7B61FF', '#5A3FE0'];
      case 'success': return ['#00C48C', '#009E71'];
      case 'danger': return ['#FF5C7A', '#D93D58'];
      case 'dark': return ['#1E2040', '#13142A'];
      default: return ['#4F6EF7', '#3050D8'];
    }
  };

  const getShadow = () => {
    switch (variant) {
      case 'accent': return SHADOWS.glowAccent;
      case 'success': return { ...SHADOWS.lg, shadowColor: '#00C48C' };
      default: return SHADOWS.glow;
    }
  };

  const getHeight = () => {
    switch (size) {
      case 'sm': return 44;
      case 'lg': return 58;
      default: return 52;
    }
  };

  const [c1, c2] = getColors();

  return (
    <AnimatedPressable
      style={[styles.buttonContainer, { height: getHeight() }, getShadow(), disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      scaleTo={0.96}
    >
      <View style={[styles.gradientWrapper, { borderRadius: 18 }]}>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id={`btnGrad_${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={c1} />
              <Stop offset="100%" stopColor={c2} />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" rx="18" fill={`url(#btnGrad_${variant})`} />
        </Svg>
        <View style={styles.contentOverlay}>
          {loading ? (
            <ActivityIndicator color={COLORS.white} size="small" />
          ) : (
            <>
              {icon && <Ionicons name={icon} size={18} color={COLORS.white} />}
              <Text style={[styles.buttonText, textStyle]}>{title}</Text>
            </>
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 18,
    overflow: 'hidden',
    marginVertical: 5,
  },
  gradientWrapper: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  contentOverlay: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 8,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.1,
  },
  disabled: {
    opacity: 0.45,
  },
});
