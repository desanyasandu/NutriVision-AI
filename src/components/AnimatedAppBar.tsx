import React from 'react';
import { View, StyleSheet, Text, Image, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
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
  rightAction2Icon?: keyof typeof Ionicons.glyphMap;
  onRightAction2?: () => void;
  style?: ViewStyle;
  largeTitle?: boolean;
  dark?: boolean;
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
  rightAction2Icon,
  onRightAction2,
  style,
  largeTitle = false,
  dark = false,
}) => {
  const titleColor = dark ? COLORS.darkText : COLORS.textPrimary;
  const subColor = dark ? 'rgba(228,231,255,0.6)' : COLORS.textSecondary;
  const btnBg = dark ? 'rgba(255,255,255,0.1)' : 'rgba(255, 255, 255, 0.85)';
  const btnBorder = dark ? 'rgba(255,255,255,0.1)' : 'rgba(200, 207, 228, 0.7)';
  const iconColor = dark ? COLORS.darkText : COLORS.textPrimary;

  return (
    <View style={[styles.header, style]}>
      <View style={styles.leftRow}>
        {showBack && (
          <AnimatedPressable style={[styles.iconBtn, { backgroundColor: btnBg, borderColor: btnBorder }]} onPress={onBack}>
            <Ionicons name="chevron-back" size={20} color={iconColor} />
          </AnimatedPressable>
        )}

        {showProfile && (
          <AnimatedPressable style={styles.profileBtn} onPress={onProfilePress}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }}
              style={styles.avatar}
            />
            <View style={styles.onlineDot} />
          </AnimatedPressable>
        )}

        {title && (
          <View style={styles.titleWrap}>
            <Text style={[largeTitle ? styles.largeTitle : styles.normalTitle, { color: titleColor }]} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && <Text style={[styles.subtitle, { color: subColor }]}>{subtitle}</Text>}
          </View>
        )}
      </View>

      <View style={styles.rightRow}>
        {rightAction2Icon && (
          <AnimatedPressable
            style={[styles.iconBtn, { backgroundColor: btnBg, borderColor: btnBorder }]}
            onPress={onRightAction2}
          >
            <Ionicons name={rightAction2Icon} size={18} color={iconColor} />
          </AnimatedPressable>
        )}
        {rightActionIcon && (
          <AnimatedPressable
            style={[styles.iconBtn, { backgroundColor: btnBg, borderColor: btnBorder }]}
            onPress={onRightAction}
          >
            <Ionicons name={rightActionIcon} size={18} color={iconColor} />
          </AnimatedPressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  titleWrap: {
    flex: 1,
  },
  largeTitle: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  normalTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 1,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.xs,
  },
  profileBtn: {
    position: 'relative',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
