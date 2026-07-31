import React from 'react';
import { View, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';
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
  variant?: 'glass' | 'solid' | 'gradient' | 'accent';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  icon,
  iconColor = COLORS.primary,
  iconBg = 'rgba(59, 130, 246, 0.1)',
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
}) => {
  const getCardStyle = () => {
    switch (variant) {
      case 'accent':
        return styles.accentCard;
      case 'solid':
        return styles.solidCard;
      case 'gradient':
        return styles.gradientCard;
      case 'glass':
      default:
        return styles.glassCard;
    }
  };

  const CardWrapper = onPress ? AnimatedPressable : View;

  return (
    <CardWrapper style={[styles.baseCard, getCardStyle(), SHADOWS.sm, style]} onPress={onPress}>
      {/* Header section with Icon, Title, Subtitle & Badge */}
      {(title || icon || badgeText) && (
        <View style={styles.headerRow}>
          {icon && (
            <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
              <Ionicons name={icon} size={20} color={iconColor} />
            </View>
          )}

          <View style={styles.titleContainer}>
            {title && <Text style={styles.cardTitle}>{title}</Text>}
            {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
          </View>

          {badgeText && (
            <View style={[styles.badge, { backgroundColor: badgeColor + '18', borderColor: badgeColor + '40' }]}>
              <Text style={[styles.badgeText, { color: badgeColor }]}>{badgeText}</Text>
            </View>
          )}
        </View>
      )}

      {/* Main Children Slot */}
      {children && <View style={[styles.bodyContent, contentStyle]}>{children}</View>}

      {/* Optional CTA Footer */}
      {ctaText && (
        <AnimatedPressable style={styles.ctaButton} onPress={onCtaPress || onPress}>
          <Text style={styles.ctaText}>{ctaText}</Text>
          <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
        </AnimatedPressable>
      )}
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  baseCard: {
    borderRadius: DESIGN_TOKENS.borderRadius.card, // 24
    padding: 18,
    marginVertical: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  solidCard: {
    backgroundColor: COLORS.cardBg,
    borderColor: COLORS.cardBorder,
  },
  accentCard: {
    backgroundColor: 'rgba(240, 246, 255, 0.95)',
    borderColor: 'rgba(59, 130, 246, 0.25)',
  },
  gradientCard: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(124, 58, 237, 0.2)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: DESIGN_TOKENS.fontSize.cardTitle, // 18
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  cardSubtitle: {
    fontSize: DESIGN_TOKENS.fontSize.caption, // 13
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  bodyContent: {
    marginTop: 4,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(241, 245, 249, 0.9)',
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
  },
});
