export const COLORS = {
  // Base Theme Colors from Palette
  background: '#181C22',           // Deep modern dark background
  cardBg: '#252B33',               // Sleek card surface
  cardBorder: '#363E4A',           // Crisp border matching Jet Black tone
  jetBlack: '#31393C',             // Jet Black from palette
  
  // Primary Blues (Palette: 2176FF & 33A1FD)
  primary: '#2176FF',              // Crayola Blue (Vibrant Brand Primary)
  primaryLight: '#33A1FD',         // Blue Bell (Sky Blue Accent)
  primaryDark: '#175AD1',
  
  // Warm Accent Colors (Palette: FDCA40 & F79824)
  secondary: '#F79824',            // Carrot Orange (Secondary Brand Accent)
  secondaryLight: '#FDCA40',       // Golden Pollen (Warm Yellow Accent)
  accent: '#33A1FD',               // Electric Blue accent
  
  // Status & Utility Colors
  warning: '#FDCA40',              // Golden Pollen
  danger: '#F79824',               // Carrot Orange Alert
  dangerAlert: '#EF4444',          // Severe Red
  info: '#2176FF',                 // Crayola Blue Info
  
  // Typography
  textPrimary: '#FFFFFF',
  textSecondary: '#A0AEC0',
  textMuted: '#64748B',
  white: '#FFFFFF',
  black: '#000000',
  
  // Overlays
  glassOverlay: 'rgba(255, 255, 255, 0.06)',
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#2176FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
};
