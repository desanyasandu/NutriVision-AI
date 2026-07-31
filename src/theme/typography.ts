import { TextStyle } from 'react-native';
import { COLORS } from './colors';

export const TYPOGRAPHY: Record<string, TextStyle> = {
  heroDisplay: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  h1: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  h2: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    lineHeight: 26,
  },
  h3: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  h4: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.1,
    lineHeight: 20,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  bodySecondary: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  caption: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textMuted,
    lineHeight: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
};
