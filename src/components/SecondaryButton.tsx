import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';
import { AnimatedPressable } from './AnimatedPressable';

interface SecondaryButtonProps {
  title: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconColor?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
  iconColor = COLORS.primary,
}) => {
  return (
    <AnimatedPressable
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.primary} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && <Ionicons name={icon} size={18} color={iconColor} style={styles.icon} />}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: DESIGN_TOKENS.borderRadius.button, // 18
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginVertical: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  icon: {
    marginRight: 2,
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  disabled: {
    opacity: 0.5,
  },
});
