import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { AnimatedPressable } from './AnimatedPressable';

interface SecondaryButtonProps {
  title: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconColor?: string;
  variant?: 'outline' | 'ghost' | 'danger';
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  icon,
  disabled = false,
  style,
  textStyle,
  iconColor,
  variant = 'outline',
}) => {
  const getBorderColor = () => {
    if (variant === 'danger') return 'rgba(255, 92, 122, 0.35)';
    if (variant === 'ghost') return 'transparent';
    return 'rgba(200, 207, 228, 0.8)';
  };

  const getBg = () => {
    if (variant === 'danger') return 'rgba(255, 92, 122, 0.06)';
    if (variant === 'ghost') return 'transparent';
    return 'rgba(255, 255, 255, 0.78)';
  };

  const getTextColor = () => {
    if (variant === 'danger') return COLORS.danger;
    return COLORS.textPrimary;
  };

  const getIconColor = () => {
    if (iconColor) return iconColor;
    if (variant === 'danger') return COLORS.danger;
    return COLORS.primary;
  };

  return (
    <AnimatedPressable
      style={[
        styles.button,
        {
          borderColor: getBorderColor(),
          backgroundColor: getBg(),
        },
        SHADOWS.xs,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      scaleTo={0.97}
    >
      <View style={styles.content}>
        {icon && <Ionicons name={icon} size={18} color={getIconColor()} />}
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginVertical: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.45,
  },
});
