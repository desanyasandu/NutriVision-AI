export const COLORS = {
  // Base Canvas & Surface Backgrounds (Ultra Clean & Modern)
  background: '#F8FAFC',           // Apple/Linear Crisp Slate Background
  cardBg: '#FFFFFF',               // Pure White Surface
  cardBorder: 'rgba(226, 232, 240, 0.8)', // Subtle border divider
  cardBorderFocus: '#2176FF',      // Active focus border
  jetBlack: '#0F172A',             // Dark Slate 900 for Titles & Heavy Contrast
  trackBg: '#E2E8F0',              // High-Contrast Progress Bar Track
  trackBgLight: 'rgba(0, 0, 0, 0.05)', // Overlay track

  // Primary Brand Colors (Palette: Crayola Electric Blue & Sky Accent)
  primary: '#2176FF',              // Crayola Blue (Vibrant Primary)
  primaryLight: '#33A1FD',         // Sky Blue Accent
  primaryDark: '#1152BE',          // Deep Indigo Blue
  primarySubtle: 'rgba(33, 118, 255, 0.08)', // Light Blue Tint

  // Warm Secondary Accent Colors (Palette: Carrot Orange & Golden Pollen)
  secondary: '#F79824',            // Vibrant Carrot Orange
  secondaryLight: '#FDCA40',       // Warm Golden Yellow
  secondaryDark: '#D97706',        // Dark Amber for clear text contrast
  accent: '#33A1FD',               // Vibrant Sky Blue
  aiSparkle: '#8B5CF6',            // Electric Violet for AI Features

  // Status & Utility Colors
  warning: '#F59E0B',              // Warm Amber Warning
  warningDark: '#D97706',          // Accessible Amber Text
  danger: '#EF4444',               // Alert Coral Red
  dangerDark: '#DC2626',           // Deep Crimson Alert
  info: '#2176FF',                 // Crayola Blue Info
  success: '#10B981',              // Emerald Green Success
  successDark: '#059669',          // Deep Emerald Text

  // Typography Palette
  textPrimary: '#0F172A',          // Slate 900 for Main Headers
  textSecondary: '#334155',        // High-Contrast Slate 700 for Body & Subtitles
  textMuted: '#64748B',            // High-Contrast Slate 600 for Captions
  white: '#FFFFFF',
  black: '#000000',

  // Glassmorphism & Translucency
  glassBg: 'rgba(255, 255, 255, 0.85)',
  glassBorder: 'rgba(255, 255, 255, 0.6)',
  glassOverlay: 'rgba(33, 118, 255, 0.08)',
};

export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#2176FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 6,
  },
  glow: {
    shadowColor: '#2176FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  glass: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
};
