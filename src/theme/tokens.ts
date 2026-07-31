export const DESIGN_TOKENS = {
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  borderRadius: {
    xs: 6,
    sm: 10,
    md: 14,
    card: 20,       // Flagship 20px card border radius requirement
    lg: 20,
    xl: 24,
    xxl: 32,
    pill: 999,
  },
  touchTarget: {
    minHeight: 44,
    minWidth: 44,
  },
  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
    black: '900' as const,
  },
};
