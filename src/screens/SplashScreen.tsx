import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
            <Ionicons name="sparkles" size={14} color="#2563EB" />
            <Text style={styles.badgePillText}>IDEALIZE 2026 • Health AI</Text>
          </View>
        </View>

        {/* Brand Logo & Tagline */}
        <View style={styles.logoSection}>
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Ionicons name="hardware-chip-outline" size={28} color="#2563EB" />
            </View>
            <Text style={styles.brandTitle}>
              NutriVision <Text style={{ color: '#2563EB' }}>AI</Text>
            </Text>
          </View>

          <Text style={styles.brandTagline}>See Your Food, Predict Your Health.</Text>
        </View>

        {/* Central Hero Illustration Card */}
        <View style={[styles.heroCard, SHADOWS.medium]}>
          {/* Top Badges inside Hero Card */}
          <View style={styles.heroTopBadges}>
            <View style={styles.accuracyBadge}>
              <Ionicons name="shield-checkmark" size={14} color={COLORS.white} />
              <View>
                <Text style={styles.accuracyBadgeText}>98% Vision Accuracy</Text>
                <Text style={styles.accuracyBadgeSub}>Powered by Advanced AI</Text>
              </View>
            </View>

            <View style={styles.detectedBadge}>
              <View style={styles.leafCircle}>
                <Ionicons name="leaf" size={14} color="#10B981" />
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
                <Ionicons name="flame" size={14} color="#F97316" />
                <View>
                  <Text style={styles.metricLabel}>CALORIES</Text>
                  <Text style={styles.metricValue}>650 kcal</Text>
                </View>
              </View>

              <View style={styles.metricPill}>
                <Ionicons name="leaf" size={14} color="#10B981" />
                <View>
                  <Text style={styles.metricLabel}>CARBS</Text>
                  <Text style={styles.metricValue}>45 g</Text>
                </View>
              </View>

              <View style={styles.metricPill}>
                <Ionicons name="fitness" size={14} color="#3B82F6" />
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
                <Ionicons name="shield-checkmark" size={14} color="#059669" />
                <View>
                  <Text style={styles.metricLabel}>ANTIOXIDANT</Text>
                  <Text style={styles.metricValue}>High Level</Text>
                </View>
              </View>

              {/* Glassmorphic Health Score Card */}
              <View style={styles.healthScoreCard}>
                <Ionicons name="trending-up" size={16} color="#34D399" />
                <Text style={styles.healthScoreLabel}>HEALTH SCORE</Text>
                <Text style={styles.healthScoreVal}>92 / 100</Text>
              </View>

              <View style={styles.metricPill}>
                <Ionicons name="water" size={14} color="#0EA5E9" />
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
              <Ionicons name="pulse" size={20} color="#10B981" />
            </View>
            <View style={styles.calloutTextGroup}>
              <Text style={styles.calloutTitle}>Proactive Disease Prevention</Text>
              <Text style={styles.calloutSub}>Predicts Diabetes, Obesity & Hypertension risks</Text>
            </View>
            <View style={styles.calloutArrowBtn}>
              <Ionicons name="arrow-forward" size={14} color="#2563EB" />
            </View>
          </View>
        </View>

        {/* Feature Badges Row (3 Cards) */}
        <View style={styles.featuresRow}>
          <TouchableOpacity style={[styles.featureCard, SHADOWS.small]} activeOpacity={0.8}>
            <View style={[styles.featureIconCircle, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="camera-outline" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.featureTitle}>Food Vision</Text>
            <Text style={styles.featureSub}>OCR & Object AI</Text>
            <View style={[styles.miniArrowCircle, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="arrow-forward" size={12} color="#3B82F6" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.featureCard, SHADOWS.small]} activeOpacity={0.8}>
            <View style={[styles.featureIconCircle, { backgroundColor: '#10B981' }]}>
              <Ionicons name="analytics-outline" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.featureTitle}>NCD Risk ML</Text>
            <Text style={styles.featureSub}>5 Disease Models</Text>
            <View style={[styles.miniArrowCircle, { backgroundColor: '#ECFDF5' }]}>
              <Ionicons name="arrow-forward" size={12} color="#10B981" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.featureCard, SHADOWS.small]} activeOpacity={0.8}>
            <View style={[styles.featureIconCircle, { backgroundColor: '#A855F7' }]}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.featureTitle}>AI Coach</Text>
            <Text style={styles.featureSub}>Agentic Guidance</Text>
            <View style={[styles.miniArrowCircle, { backgroundColor: '#F3E8FF' }]}>
              <Ionicons name="arrow-forward" size={12} color="#A855F7" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Main CTA Button */}
        <TouchableOpacity style={[styles.startBtn, SHADOWS.medium]} onPress={onStart} activeOpacity={0.88}>
          <Text style={styles.startBtnText}>Get Started Now</Text>
          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-forward" size={18} color="#2563EB" />
          </View>
        </TouchableOpacity>

        {/* Footer Info */}
        <View style={styles.footerContainer}>
          <View style={styles.privacyNoteRow}>
            <Ionicons name="shield-checkmark-outline" size={14} color="#64748B" />
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
    backgroundColor: '#FAFCFF',
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
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  badgePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
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
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  heroCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 26,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
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
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  accuracyBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.white,
  },
  accuracyBadgeSub: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
  },
  detectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  leafCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detectedTitle: {
    fontSize: 9,
    fontWeight: '900',
    color: '#0F172A',
  },
  detectedSub: {
    fontSize: 9,
    color: '#64748B',
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
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  metricLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#64748B',
  },
  metricValue: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
  },
  healthScoreCard: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: 'center',
    gap: 2,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
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
    borderColor: '#38BDF8',
    overflow: 'hidden',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  bowlImage: {
    width: '100%',
    height: '100%',
  },
  proactiveCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pulseIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutTextGroup: {
    flex: 1,
  },
  calloutTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  calloutSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  calloutArrowBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F1F5F9',
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
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  featureIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  featureTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
  },
  featureSub: {
    fontSize: 9,
    color: '#64748B',
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
    backgroundColor: '#2563EB',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 24,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  startBtnText: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.white,
  },
  arrowCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
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
    color: '#64748B',
    fontWeight: '600',
  },
  footerNote: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 2,
  },
});

