import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header Pill Badge */}
        <View style={styles.topBadgeRow}>
          <View style={styles.badgePill}>
            <Ionicons name="sparkles" size={14} color={COLORS.primary} />
            <Text style={styles.badgePillText}>IDEALIZE 2026 • Health AI</Text>
          </View>
        </View>

        {/* Brand Logo & Tagline */}
        <View style={styles.logoSection}>
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Ionicons name="hardware-chip" size={26} color={COLORS.primary} />
            </View>
            <Text style={styles.brandTitle}>
              NutriVision <Text style={{ color: COLORS.primary }}>AI</Text>
            </Text>
          </View>

          <Text style={styles.brandTagline}>See Your Food, Predict Your Health.</Text>
        </View>

        {/* Central Hero Illustration Card */}
        <View style={[styles.heroCard, SHADOWS.lg]}>
          {/* Top Badges inside Hero Card */}
          <View style={styles.heroTopBadges}>
            <View style={styles.accuracyBadge}>
              <Ionicons name="shield-checkmark" size={14} color={COLORS.white} />
              <View>
                <Text style={styles.accuracyBadgeText}>98% Vision Accuracy</Text>
                <Text style={styles.accuracyBadgeSub}>Powered by Clinical AI</Text>
              </View>
            </View>

            <View style={styles.detectedBadge}>
              <View style={styles.leafCircle}>
                <Ionicons name="leaf" size={14} color={COLORS.successDark} />
              </View>
              <View>
                <Text style={styles.detectedTitle}>SALAD</Text>
                <Text style={styles.detectedSub}>Detected</Text>
              </View>
            </View>
          </View>

          {/* Center Bowl & Floating Metric Cards Grid */}
          <View style={styles.heroCenterContainer}>
            {/* Left Metrics Column */}
            <View style={styles.leftMetricsColumn}>
              <View style={styles.metricPill}>
                <Ionicons name="flame" size={13} color={COLORS.warning} />
                <View>
                  <Text style={styles.metricLabel}>CALORIES</Text>
                  <Text style={styles.metricValue}>650 kcal</Text>
                </View>
              </View>

              <View style={styles.metricPill}>
                <Ionicons name="leaf" size={13} color={COLORS.success} />
                <View>
                  <Text style={styles.metricLabel}>CARBS</Text>
                  <Text style={styles.metricValue}>45 g</Text>
                </View>
              </View>

              <View style={styles.metricPill}>
                <Ionicons name="fitness" size={13} color={COLORS.primary} />
                <View>
                  <Text style={styles.metricLabel}>PROTEIN</Text>
                  <Text style={styles.metricValue}>38 g</Text>
                </View>
              </View>
            </View>

            {/* Center Salmon Salad Bowl Image */}
            <View style={styles.bowlImageWrapper}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
                }}
                style={styles.bowlImage}
                resizeMode="cover"
              />
            </View>

            {/* Right Metrics Column */}
            <View style={styles.rightMetricsColumn}>
              <View style={styles.metricPill}>
                <Ionicons name="shield-checkmark" size={13} color={COLORS.successDark} />
                <View>
                  <Text style={styles.metricLabel}>ANTIOXIDANT</Text>
                  <Text style={styles.metricValue}>High Level</Text>
                </View>
              </View>

              {/* Glassmorphic Health Score Card */}
              <View style={styles.healthScoreCard}>
                <Ionicons name="trending-up" size={16} color={COLORS.success} />
                <Text style={styles.healthScoreLabel}>HEALTH SCORE</Text>
                <Text style={styles.healthScoreVal}>92 / 100</Text>
              </View>

              <View style={styles.metricPill}>
                <Ionicons name="water" size={13} color={COLORS.primaryLight} />
                <View>
                  <Text style={styles.metricLabel}>FIBER</Text>
                  <Text style={styles.metricValue}>12 g</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Proactive Disease Callout */}
          <View style={styles.proactiveCallout}>
            <View style={styles.pulseIconBox}>
              <Ionicons name="pulse" size={20} color={COLORS.successDark} />
            </View>
            <View style={styles.calloutTextGroup}>
              <Text style={styles.calloutTitle}>Proactive Disease Prevention</Text>
              <Text style={styles.calloutSub}>Predicts Diabetes, Obesity & Hypertension risks</Text>
            </View>
            <View style={styles.calloutArrowBtn}>
              <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
            </View>
          </View>
        </View>

        {/* Feature Badges Row (3 Cards) */}
        <View style={styles.featuresRow}>
          <AnimatedPressable style={[styles.featureCard, SHADOWS.sm]}>
            <View style={[styles.featureIconCircle, { backgroundColor: COLORS.primary }]}>
              <Ionicons name="camera" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.featureTitle}>Food Vision</Text>
            <Text style={styles.featureSub}>OCR & Object AI</Text>
            <View style={[styles.miniArrowCircle, { backgroundColor: 'rgba(33, 118, 255, 0.1)' }]}>
              <Ionicons name="arrow-forward" size={12} color={COLORS.primary} />
            </View>
          </AnimatedPressable>

          <AnimatedPressable style={[styles.featureCard, SHADOWS.sm]}>
            <View style={[styles.featureIconCircle, { backgroundColor: COLORS.success }]}>
              <Ionicons name="analytics" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.featureTitle}>NCD Risk ML</Text>
            <Text style={styles.featureSub}>5 Disease Models</Text>
            <View style={[styles.miniArrowCircle, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
              <Ionicons name="arrow-forward" size={12} color={COLORS.success} />
            </View>
          </AnimatedPressable>

          <AnimatedPressable style={[styles.featureCard, SHADOWS.sm]}>
            <View style={[styles.featureIconCircle, { backgroundColor: COLORS.aiSparkle }]}>
              <Ionicons name="chatbubble-ellipses" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.featureTitle}>AI Coach</Text>
            <Text style={styles.featureSub}>Agentic Guidance</Text>
            <View style={[styles.miniArrowCircle, { backgroundColor: 'rgba(139, 92, 246, 0.1)' }]}>
              <Ionicons name="arrow-forward" size={12} color={COLORS.aiSparkle} />
            </View>
          </AnimatedPressable>
        </View>

        {/* Main CTA Button */}
        <AnimatedPressable style={[styles.startBtn, SHADOWS.glow]} onPress={onStart}>
          <Text style={styles.startBtnText}>Get Started Now</Text>
          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
          </View>
        </AnimatedPressable>

        {/* Footer Info */}
        <View style={styles.footerContainer}>
          <View style={styles.privacyNoteRow}>
            <Ionicons name="shield-checkmark-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.privacyText}>Your health data is 100% private & secure.</Text>
          </View>
          <Text style={styles.footerNote}>Created by Team The Dark Code • NIBM  ♡</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
    gap: 14,
  },
  topBadgeRow: {
    alignItems: 'center',
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(33, 118, 255, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(33, 118, 255, 0.25)',
  },
  badgePillText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.2,
  },
  logoSection: {
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.sm,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.6,
  },
  brandTagline: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  heroCard: {
    width: '100%',
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    gap: 12,
  },
  heroTopBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accuracyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  accuracyBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.white,
  },
  accuracyBadgeSub: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
  },
  detectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  leafCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detectedTitle: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  detectedSub: {
    fontSize: 9,
    color: COLORS.textMuted,
  },
  heroCenterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  leftMetricsColumn: {
    gap: 8,
    width: '28%',
  },
  rightMetricsColumn: {
    gap: 8,
    width: '28%',
  },
  metricPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  metricLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textMuted,
  },
  metricValue: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  healthScoreCard: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: 'center',
    gap: 2,
    ...SHADOWS.md,
  },
  healthScoreLabel: {
    fontSize: 7,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.5,
  },
  healthScoreVal: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.white,
  },
  bowlImageWrapper: {
    width: 136,
    height: 136,
    borderRadius: 68,
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
    overflow: 'hidden',
    ...SHADOWS.glow,
  },
  bowlImage: {
    width: '100%',
    height: '100%',
  },
  proactiveCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  pulseIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutTextGroup: {
    flex: 1,
  },
  calloutTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  calloutSub: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  calloutArrowBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  featureCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  featureIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  featureTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  featureSub: {
    fontSize: 9,
    color: COLORS.textSecondary,
    marginTop: 2,
    marginBottom: 8,
  },
  miniArrowCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 24,
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
  footerContainer: {
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  privacyNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  privacyText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  footerNote: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginTop: 2,
  },
});
