import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { LayeredBackground } from '../components/LayeredBackground';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <LayeredBackground>
      <View style={styles.container}>
        {/* Premium Gradient Brand Orb */}
        <View style={styles.orbContainer}>
          <View style={[styles.orbGlow, SHADOWS.glow]} />
          <View style={[styles.orbOuter, SHADOWS.lg]}>
            <Svg width={80} height={80}>
              <Defs>
                <LinearGradient id="splashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#7B61FF" />
                  <Stop offset="50%" stopColor="#4F6EF7" />
                  <Stop offset="100%" stopColor="#00C48C" />
                </LinearGradient>
              </Defs>
              <Circle cx={40} cy={40} r={40} fill="url(#splashGrad)" />
            </Svg>
            <View style={styles.orbIcon}>
              <Ionicons name="sparkles" size={36} color={COLORS.white} />
            </View>
          </View>
        </View>

        {/* Brand Name */}
        <Text style={styles.brandName}>NutriVision</Text>
        <Text style={styles.brandSuffix}>AI Health Platform</Text>

        {/* Tag Badge */}
        <View style={styles.tagBadge}>
          <View style={styles.tagDot} />
          <Text style={styles.tagText}>CLINICAL-GRADE AI · PRECISION NUTRITION</Text>
        </View>

        {/* Hero Description */}
        <Text style={styles.heroDesc}>
          Real-time macro recognition, vascular disease prevention, and predictive 3D organ modeling — all in your pocket.
        </Text>

        {/* Feature Showcase Cards */}
        <View style={styles.featureGrid}>
          <View style={[styles.featureTile, { backgroundColor: COLORS.primarySubtle, borderColor: 'rgba(79,110,247,0.2)' }]}>
            <Ionicons name="camera" size={22} color={COLORS.primary} />
            <Text style={styles.featureTileTitle}>Neural Scanner</Text>
            <Text style={styles.featureTileSub}>99.4% AI accuracy</Text>
          </View>

          <View style={[styles.featureTile, { backgroundColor: COLORS.accentSubtle, borderColor: 'rgba(123,97,255,0.2)' }]}>
            <Ionicons name="body" size={22} color={COLORS.accent} />
            <Text style={styles.featureTileTitle}>Health Twin</Text>
            <Text style={styles.featureTileSub}>3D organ modeling</Text>
          </View>

          <View style={[styles.featureTile, { backgroundColor: COLORS.secondarySubtle, borderColor: 'rgba(0,196,140,0.2)' }]}>
            <Ionicons name="shield-checkmark" size={22} color={COLORS.secondary} />
            <Text style={styles.featureTileTitle}>Disease Guard</Text>
            <Text style={styles.featureTileSub}>Real-time risk alerts</Text>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <PrimaryButton title="Start Your Health Journey" icon="arrow-forward" onPress={onStart} size="lg" />
          <Text style={styles.legalText}>Medical Disclaimer: For educational use only. Not a clinical substitute.</Text>
        </View>
      </View>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  orbContainer: {
    position: 'relative',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 110,
  },
  orbGlow: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.primaryGlow,
  },
  orbOuter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.9)',
    overflow: 'hidden',
  },
  orbIcon: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 38,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -1.2,
  },
  brandSuffix: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.2,
    marginTop: 2,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primarySubtle,
    borderWidth: 1,
    borderColor: 'rgba(79, 110, 247, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 99,
    gap: 6,
    marginTop: 12,
    marginBottom: 16,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.8,
  },
  heroDesc: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  featureGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
    width: '100%',
  },
  featureTile: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    gap: 6,
    ...SHADOWS.sm,
  },
  featureTileTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  featureTileSub: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  ctaSection: {
    width: '100%',
    gap: 12,
  },
  legalText: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 15,
  },
});
