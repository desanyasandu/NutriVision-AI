import { TextStyle } from 'react-native';
import { COLORS } from './colors';

export const TYPOGRAPHY: Record<string, TextStyle> = {
  hugeTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  heroDisplay: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    lineHeight: 28,
  },
  h1: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  h2: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    lineHeight: 28,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  h3: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  h4: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
    lineHeight: 21,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    lineHeight: 23,
  },
  body: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  bodyMedium: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  bodySecondary: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
};

