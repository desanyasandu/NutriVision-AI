import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient, Stop, Rect, Circle } from 'react-native-svg';
import { LayeredBackground } from '../components/LayeredBackground';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <LayeredBackground style={styles.container}>
      <View style={styles.content}>
        {/* Flagship Brand Logo Orb */}
        <View style={styles.logoWrapper}>
          <View style={[styles.logoOrb, SHADOWS.glow]}>
            <Svg width={80} height={80}>
              <Defs>
                <LinearGradient id="splashLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#3B82F6" />
                  <Stop offset="100%" stopColor="#7C3AED" />
                </LinearGradient>
              </Defs>
              <Circle cx={40} cy={40} r={40} fill="url(#splashLogoGrad)" />
            </Svg>
            <View style={styles.logoIconOverlay}>
              <Ionicons name="sparkles" size={38} color={COLORS.white} />
            </View>
          </View>
        </View>

        {/* Hero Title & Subtitle */}
        <Text style={styles.brandTitle}>NutriVision AI</Text>
        <Text style={styles.heroSub}>CLINICAL DIETARY & HEALTH TWIN PLATFORM</Text>

        <Text style={styles.description}>
          AI-driven real-time macronutrient recognition, vascular migraine prevention, and 3D organ system modeling.
        </Text>

        {/* Feature Cards Showcase */}
        <GlassCard variant="glass" style={styles.featureShowcase}>
          <View style={styles.featureRow}>
            <View style={[styles.featureIconBox, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
              <Ionicons name="camera" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.featureTextCol}>
              <Text style={styles.featureTitle}>Neural Food Scanner</Text>
              <Text style={styles.featureSub}>Instant macro breakdown with 99.4% AI accuracy</Text>
            </View>
          </View>

          <View style={[styles.featureRow, { marginTop: 12 }]}>
            <View style={[styles.featureIconBox, { backgroundColor: 'rgba(124, 58, 237, 0.1)' }]}>
              <Ionicons name="body" size={20} color={COLORS.accent} />
            </View>
            <View style={styles.featureTextCol}>
              <Text style={styles.featureTitle}>3D Digital Health Twin</Text>
              <Text style={styles.featureSub}>Predictive organ system modeling & risk alerts</Text>
            </View>
          </View>
        </GlassCard>

        {/* Primary Call-To-Action Button */}
        <PrimaryButton
          title="Get Started • Launch Application"
          icon="arrow-forward"
          onPress={onStart}
          style={styles.launchBtn}
        />
      </View>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    width: '100%',
    maxWidth: 440,
    alignItems: 'center',
  },
  logoWrapper: {
    marginBottom: 20,
  },
  logoOrb: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  logoIconOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -1,
  },
  heroSub: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1.5,
    marginTop: 4,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  featureShowcase: {
    width: '100%',
    padding: 18,
    marginVertical: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureTextCol: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  featureSub: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  launchBtn: {
    width: '100%',
    marginTop: 24,
  },
});
