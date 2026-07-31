import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';
import { AnimatedPressable } from './AnimatedPressable';

interface PrimaryButtonProps {
  title: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'accent' | 'success' | 'danger';
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
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'accent':
        return ['#8B5CF6', '#6D28D9'];
      case 'success':
        return ['#10B981', '#059669'];
      case 'danger':
        return ['#EF4444', '#DC2626'];
      case 'primary':
      default:
        return ['#3B82F6', '#1D4ED8'];
    }
  };

  const [c1, c2] = getGradientColors();

  return (
    <AnimatedPressable
      style={[styles.buttonContainer, SHADOWS.md, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <View style={styles.gradientWrapper}>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={c1} />
              <Stop offset="100%" stopColor={c2} />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" rx={DESIGN_TOKENS.borderRadius.button} fill="url(#btnGrad)" />
        </Svg>

        <View style={styles.contentOverlay}>
          {loading ? (
            <ActivityIndicator color={COLORS.white} size="small" />
          ) : (
            <>
              {icon && <Ionicons name={icon} size={18} color={COLORS.white} style={styles.icon} />}
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
    height: 52,
    borderRadius: DESIGN_TOKENS.borderRadius.button, // 18
    overflow: 'hidden',
    marginVertical: 6,
  },
  gradientWrapper: {
    flex: 1,
    position: 'relative',
    borderRadius: DESIGN_TOKENS.borderRadius.button,
  },
  contentOverlay: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 8,
  },
  icon: {
    marginRight: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.2,
  },
  disabled: {
    opacity: 0.5,
  },
});
