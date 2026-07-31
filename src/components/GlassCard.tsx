import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { AnimatedPressable } from './AnimatedPressable';

interface GlassCardProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBg?: string;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  badgeColor?: string;
  children?: React.ReactNode;
  ctaText?: string;
  onCtaPress?: () => void;
  onPress?: () => void;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  variant?: 'glass' | 'solid' | 'dark' | 'accent' | 'gradient' | 'outline';
  compact?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  icon,
  iconColor = COLORS.primary,
  iconBg = 'rgba(79, 110, 247, 0.12)',
  title,
  subtitle,
  badgeText,
  badgeColor = COLORS.primary,
  children,
  ctaText,
  onCtaPress,
  onPress,
  style,
  contentStyle,
  variant = 'glass',
  compact = false,
}) => {
  const getCardStyle = () => {
    switch (variant) {
      case 'dark':
        return styles.darkCard;
      case 'accent':
        return styles.accentCard;
      case 'outline':
        return styles.outlineCard;
      case 'gradient':
        return styles.gradientCard;
      case 'solid':
        return styles.solidCard;
      case 'glass':
      default:
        return styles.glassCard;
    }
  };

  const getTitleColor = () => variant === 'dark' ? COLORS.darkText : COLORS.textPrimary;
  const getSubColor = () => variant === 'dark' ? 'rgba(228, 231, 255, 0.6)' : COLORS.textSecondary;

  const CardWrapper = onPress ? AnimatedPressable : View;

  return (
    <CardWrapper
      style={[styles.baseCard, getCardStyle(), SHADOWS.sm, compact && styles.compactPad, style]}
      onPress={onPress}
    >
      {(title || icon || badgeText) && (
        <View style={styles.headerRow}>
          {icon && (
            <View style={[styles.iconContainer, { backgroundColor: variant === 'dark' ? 'rgba(255,255,255,0.1)' : iconBg }]}>
              <Ionicons name={icon} size={18} color={variant === 'dark' ? COLORS.white : iconColor} />
            </View>
          )}
          <View style={styles.titleContainer}>
            {title && <Text style={[styles.cardTitle, { color: getTitleColor() }]}>{title}</Text>}
            {subtitle && <Text style={[styles.cardSubtitle, { color: getSubColor() }]}>{subtitle}</Text>}
          </View>
          {badgeText && (
            <View style={[styles.badge, { backgroundColor: badgeColor + '18', borderColor: badgeColor + '35' }]}>
              <Text style={[styles.badgeText, { color: badgeColor }]}>{badgeText}</Text>
            </View>
          )}
        </View>
      )}

      {children && <View style={[styles.bodyContent, contentStyle]}>{children}</View>}

      {ctaText && (
        <AnimatedPressable style={styles.ctaButton} onPress={onCtaPress || onPress}>
          <Text style={[styles.ctaText, variant === 'dark' && { color: COLORS.accentLight }]}>{ctaText}</Text>
          <Ionicons name="arrow-forward" size={13} color={variant === 'dark' ? COLORS.accentLight : COLORS.primary} />
        </AnimatedPressable>
      )}
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  baseCard: {
    borderRadius: 24,
    padding: 18,
    marginVertical: 7,
    borderWidth: 1,
    overflow: 'hidden',
  },
  compactPad: {
    padding: 14,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    borderColor: 'rgba(200, 207, 228, 0.55)',
  },
  solidCard: {
    backgroundColor: COLORS.cardBg,
    borderColor: COLORS.cardBorder,
  },
  darkCard: {
    backgroundColor: '#13142A',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  accentCard: {
    backgroundColor: 'rgba(79, 110, 247, 0.06)',
    borderColor: 'rgba(79, 110, 247, 0.2)',
  },
  outlineCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderColor: 'rgba(200, 207, 228, 0.8)',
    borderWidth: 1.5,
  },
  gradientCard: {
    backgroundColor: 'rgba(123, 97, 255, 0.06)',
    borderColor: 'rgba(123, 97, 255, 0.2)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 1,
  },
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 99,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  bodyContent: {
    marginTop: 2,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(200, 207, 228, 0.45)',
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    flex: 1,
  },
});
