export const COLORS = {
  // Base Canvas & Surface Backgrounds (Ultra Clean & Modern 2026)
  background: '#F8FAFC',           // Crisp Slate 50 Background
  cardBg: '#FFFFFF',               // Pure White Surface
  cardBorder: 'rgba(226, 232, 240, 0.8)', // Subtle border divider
  cardBorderFocus: '#3B82F6',      // Active focus border
  jetBlack: '#0F172A',             // Dark Slate 900 for Titles & Heavy Contrast
  trackBg: '#F1F5F9',              // Clean Progress Track
  trackBgLight: 'rgba(15, 23, 42, 0.04)', // Overlay track

  // Primary Brand Colors (User Spec: Blue #3B82F6)
  primary: '#3B82F6',              // Electric Royal Blue
  primaryLight: '#60A5FA',         // Sky Accent Blue
  primaryDark: '#2563EB',          // Deep Royal Blue
  primarySubtle: 'rgba(59, 130, 246, 0.08)', // Light Blue Tint

  // Secondary Accent Colors (User Spec: Emerald #10B981 & Accent Purple #7C3AED)
  secondary: '#10B981',            // Emerald Green Secondary
  secondaryLight: '#34D399',       // Vibrant Mint Green
  secondaryDark: '#059669',        // Deep Emerald Text
  accent: '#7C3AED',               // Electric Purple Accent
  accentLight: '#A78BFA',          // Soft Purple Tint
  aiSparkle: '#7C3AED',            // Violet for AI Agent Features

  // Status & Utility Colors (User Spec: Warning #F59E0B, Danger #EF4444)
  warning: '#F59E0B',              // Amber Warning
  warningDark: '#D97706',          // Accessible Amber Text
  warningSubtle: 'rgba(245, 158, 11, 0.10)',
  danger: '#EF4444',               // Coral Red Danger
  dangerDark: '#DC2626',           // Deep Crimson Alert
  dangerSubtle: 'rgba(239, 68, 68, 0.10)',
  info: '#3B82F6',                 // Royal Blue Info
  success: '#10B981',              // Emerald Green Success
  successDark: '#059669',          // Accessible Emerald Text
  successSubtle: 'rgba(16, 185, 129, 0.10)',

  // Typography Palette (User Spec: Text #0F172A, Secondary Text #64748B)
  textPrimary: '#0F172A',          // Slate 900 Primary
  textSecondary: '#64748B',        // Slate 500 Secondary
  textMuted: '#94A3B8',            // Slate 400 Muted Captions
  white: '#FFFFFF',
  black: '#000000',

  // Glassmorphism & Translucency
  glassBg: 'rgba(255, 255, 255, 0.88)',
  glassBorder: 'rgba(255, 255, 255, 0.7)',
  glassOverlay: 'rgba(59, 130, 246, 0.08)',
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
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,
  },
  lg: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  },
  glow: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 22,
    elevation: 8,
  },
  glass: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },
};
