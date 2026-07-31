import React from 'react';
import { View, StyleSheet, Text, Image, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';
import { AnimatedPressable } from './AnimatedPressable';

interface AnimatedAppBarProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showProfile?: boolean;
  onProfilePress?: () => void;
  rightActionIcon?: keyof typeof Ionicons.glyphMap;
  onRightAction?: () => void;
  style?: ViewStyle;
  largeTitle?: boolean;
}

export const AnimatedAppBar: React.FC<AnimatedAppBarProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  showProfile = false,
  onProfilePress,
  rightActionIcon,
  onRightAction,
  style,
  largeTitle = false,
}) => {
  return (
    <View style={[styles.headerContainer, style]}>
      <View style={styles.leftRow}>
        {showBack && (
          <AnimatedPressable style={styles.iconButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={22} color={COLORS.textPrimary} />
          </AnimatedPressable>
        )}

        {showProfile && (
          <AnimatedPressable style={styles.profileButton} onPress={onProfilePress}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }}
              style={styles.avatar}
            />
            <View style={styles.onlineBadge} />
          </AnimatedPressable>
        )}

        {title && (
          <View style={styles.titleWrapper}>
            <Text style={largeTitle ? styles.largeTitleText : styles.titleText} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
          </View>
        )}
      </View>

      <View style={styles.rightRow}>
        {rightActionIcon && (
          <AnimatedPressable style={styles.iconButton} onPress={onRightAction}>
            <Ionicons name={rightActionIcon} size={20} color={COLORS.textPrimary} />
          </AnimatedPressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  titleWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  largeTitleText: {
    fontSize: DESIGN_TOKENS.fontSize.hugeTitle, // 32
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.8,
  },
  titleText: {
    fontSize: DESIGN_TOKENS.fontSize.sectionTitle, // 22
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
  },
  subtitleText: {
    fontSize: DESIGN_TOKENS.fontSize.caption, // 13
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  profileButton: {
    position: 'relative',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
