export const COLORS = {
  // ─── Canvas & Surfaces ──────────────────────────────────────────────
  background: '#F5F6FA',            // Off-white premium canvas
  backgroundAlt: '#EDEEF5',         // Slightly deeper layer
  cardBg: '#FFFFFF',                // Pure white card surface
  cardBorder: 'rgba(200, 207, 228, 0.6)',
  cardBorderFocus: '#4F6EF7',

  // ─── Premium Depth Gradients (for layered backgrounds) ─────────────
  gradientTop: '#E8ECFF',           // Soft indigo tint at top
  gradientMid: '#F5F6FA',           // Seamless blend
  gradientBase: '#F0F2F8',          // Slate-blue whisper

  // ─── Primary Indigo-Blue Brand ──────────────────────────────────────
  primary: '#4F6EF7',               // Premium Indigo-Blue (Revolut-style)
  primaryLight: '#7B96FF',          // Lighter accent
  primaryDark: '#3050D8',           // Deep Cobalt
  primarySubtle: 'rgba(79, 110, 247, 0.1)',
  primaryGlow: 'rgba(79, 110, 247, 0.25)',

  // ─── Emerald Health Green ────────────────────────────────────────────
  secondary: '#00C48C',             // Vivid Emerald (Fitbit-inspired)
  secondaryLight: '#3ED9A8',        // Mint Glow
  secondaryDark: '#009E71',         // Deep Teal
  secondarySubtle: 'rgba(0, 196, 140, 0.1)',

  // ─── AI Violet / Neural Purple ──────────────────────────────────────
  accent: '#7B61FF',                // AI Neural Violet (Nothing OS hue)
  accentLight: '#A899FF',           // Soft Lilac
  accentDark: '#5A3FE0',            // Deep Violet
  accentSubtle: 'rgba(123, 97, 255, 0.1)',
  accentGlow: 'rgba(123, 97, 255, 0.25)',

  // ─── Coral & Warm Tones ─────────────────────────────────────────────
  danger: '#FF5C7A',                // Coral-Red (softer medical)
  dangerDark: '#D93D58',
  dangerSubtle: 'rgba(255, 92, 122, 0.1)',

  warning: '#FFAA00',               // Pure Amber
  warningDark: '#CC8800',
  warningSubtle: 'rgba(255, 170, 0, 0.1)',

  success: '#00C48C',
  successDark: '#009E71',
  successSubtle: 'rgba(0, 196, 140, 0.1)',
  info: '#4F6EF7',

  // ─── Typography ─────────────────────────────────────────────────────
  textPrimary: '#0D0E1A',           // Near-black premium text
  textSecondary: '#5A6080',         // Muted slate
  textMuted: '#9AA0C0',             // Lightest readable
  white: '#FFFFFF',
  black: '#000000',
  jetBlack: '#0D0E1A',

  // ─── Glassmorphism ──────────────────────────────────────────────────
  glassBg: 'rgba(255, 255, 255, 0.80)',
  glassBgHeavy: 'rgba(255, 255, 255, 0.94)',
  glassBorder: 'rgba(255, 255, 255, 0.65)',
  glassOverlay: 'rgba(79, 110, 247, 0.06)',
  glassStroke: 'rgba(200, 207, 228, 0.55)',

  // ─── Dark Accent for Nothing OS style panels ────────────────────────
  darkPanel: '#13142A',             // Near-black deep card
  darkPanelLight: '#1E2040',        // Slightly lighter
  darkStroke: 'rgba(255, 255, 255, 0.08)',
  darkText: '#E4E7FF',

  // ─── Track Backgrounds ──────────────────────────────────────────────
  trackBg: '#EDF0FA',
  trackBgLight: 'rgba(79, 110, 247, 0.06)',
};

export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#0D0E1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  sm: {
    shadowColor: '#1A2040',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  md: {
    shadowColor: '#1A2040',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.09,
    shadowRadius: 18,
    elevation: 5,
  },
  lg: {
    shadowColor: '#4F6EF7',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 28,
    elevation: 7,
  },
  glow: {
    shadowColor: '#4F6EF7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 9,
  },
  glowAccent: {
    shadowColor: '#7B61FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 9,
  },
  glass: {
    shadowColor: '#1A2040',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 4,
  },
};

export const GRADIENTS = {
  primary: ['#4F6EF7', '#7B96FF'],
  accent: ['#7B61FF', '#A899FF'],
  success: ['#00C48C', '#3ED9A8'],
  danger: ['#FF5C7A', '#FF8FA3'],
  warning: ['#FFAA00', '#FFD060'],
  dark: ['#13142A', '#1E2040'],
  health: ['#4F6EF7', '#00C48C'],
  twin: ['#7B61FF', '#4F6EF7'],
  warmSunrise: ['#FF5C7A', '#FFAA00'],
};
