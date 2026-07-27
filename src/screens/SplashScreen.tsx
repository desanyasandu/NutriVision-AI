import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <View style={styles.container}>
      {/* Background Soft Gradient Circles */}
      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      {/* Top Header */}
      <View style={styles.topContent}>
        <View style={styles.badgePill}>
          <Ionicons name="sparkles" size={14} color={COLORS.primary} />
          <Text style={styles.badgePillText}>IDEALIZE 2026 • Health AI</Text>
        </View>

        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Ionicons name="hardware-chip-outline" size={32} color={COLORS.primary} />
          </View>
          <Text style={styles.brandTitle}>NutriVision <Text style={{ color: COLORS.primary }}>AI</Text></Text>
        </View>

        <Text style={styles.brandTagline}>See Your Food, Predict Your Health.</Text>
      </View>

      {/* Hero Illustration Card */}
      <View style={[styles.illustrationCard, SHADOWS.medium]}>
        <Image
          source={require('../../assets/hero_3d.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Floating Glass Metric Pills */}
        <View style={styles.floatingMetricPill}>
          <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
          <Text style={styles.floatingMetricText}>98% Vision Accuracy</Text>
        </View>

        {/* Glass Overlay Card at bottom of hero */}
        <View style={styles.overlayGlass}>
          <View style={styles.glassIconBox}>
            <Ionicons name="pulse" size={18} color={COLORS.secondary} />
          </View>
          <View style={styles.glassTextGroup}>
            <Text style={styles.glassTitle}>Proactive Disease Prevention</Text>
            <Text style={styles.glassSub}>Predicts Diabetes, Obesity & Hypertension risks</Text>
          </View>
        </View>
      </View>

      {/* Feature Badges Row */}
      <View style={styles.featuresRow}>
        <View style={[styles.featureItem, SHADOWS.small]}>
          <View style={[styles.iconCircle, { backgroundColor: 'rgba(33, 118, 255, 0.12)' }]}>
            <Ionicons name="camera" size={20} color={COLORS.primary} />
          </View>
          <Text style={styles.featureTitle}>Food Vision</Text>
          <Text style={styles.featureSub}>OCR & Object AI</Text>
        </View>

        <View style={[styles.featureItem, SHADOWS.small]}>
          <View style={[styles.iconCircle, { backgroundColor: 'rgba(247, 152, 36, 0.12)' }]}>
            <Ionicons name="analytics" size={20} color={COLORS.secondary} />
          </View>
          <Text style={styles.featureTitle}>NCD Risk ML</Text>
          <Text style={styles.featureSub}>5 Disease Models</Text>
        </View>

        <View style={[styles.featureItem, SHADOWS.small]}>
          <View style={[styles.iconCircle, { backgroundColor: 'rgba(253, 202, 64, 0.2)' }]}>
            <Ionicons name="chatbubbles" size={20} color="#D97706" />
          </View>
          <Text style={styles.featureTitle}>AI Coach</Text>
          <Text style={styles.featureSub}>Agentic Guidance</Text>
        </View>
      </View>

      {/* Main Start Button */}
      <TouchableOpacity style={[styles.startBtn, SHADOWS.medium]} onPress={onStart} activeOpacity={0.85}>
        <Text style={styles.startBtnText}>Get Started Now</Text>
        <View style={styles.arrowCircle}>
          <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
        </View>
      </TouchableOpacity>

      <Text style={styles.footerNote}>Created by Team The Dark Code • NIBM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  glowTopRight: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(33, 118, 255, 0.08)',
  },
  glowBottomLeft: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(247, 152, 36, 0.08)',
  },
  topContent: {
    alignItems: 'center',
    marginTop: 10,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(33, 118, 255, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(33, 118, 255, 0.2)',
  },
  badgePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  brandTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.jetBlack,
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 4,
  },
  illustrationCard: {
    width: '100%',
    height: 230,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    justifyContent: 'space-between',
    padding: 12,
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  floatingMetricPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  floatingMetricText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.jetBlack,
  },
  overlayGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  glassIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(247, 152, 36, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassTextGroup: {
    flex: 1,
  },
  glassTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.jetBlack,
  },
  glassSub: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  featureItem: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.jetBlack,
  },
  featureSub: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 20,
  },
  startBtnText: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.white,
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerNote: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
});
