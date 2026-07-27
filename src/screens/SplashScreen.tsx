import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <View style={styles.container}>
      <View style={styles.glowCircle} />

      <View style={styles.topContent}>
        <View style={styles.logoBadge}>
          <Ionicons name="hardware-chip-outline" size={36} color={COLORS.primary} />
        </View>

        <Text style={styles.brandTitle}>NutriVision AI</Text>
        <Text style={styles.brandTagline}>See Your Food, Predict Your Health.</Text>
      </View>

      <View style={styles.illustrationBox}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
          }}
          style={styles.heroImage}
        />
        <View style={styles.overlayGlass}>
          <Ionicons name="sparkles-sharp" size={20} color={COLORS.primaryLight} />
          <Text style={styles.glassText}>Agentic AI Nutrition & Disease Risk Engine</Text>
        </View>
      </View>

      <View style={styles.featuresRow}>
        <View style={styles.featureItem}>
          <Ionicons name="camera-outline" size={20} color={COLORS.primary} />
          <Text style={styles.featureLabel}>Food Vision</Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="analytics-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.featureLabel}>NCD Risk ML</Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="chatbubbles-outline" size={20} color={COLORS.accent} />
          <Text style={styles.featureLabel}>AI Health Coach</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.startBtn} onPress={onStart} activeOpacity={0.85}>
        <Text style={styles.startBtnText}>Get Started Now</Text>
        <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
      </TouchableOpacity>

      <Text style={styles.footerNote}>IDEALIZE 2026 • Team The Dark Code</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 24,
  },
  glowCircle: {
    position: 'absolute',
    top: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  topContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: COLORS.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  brandTagline: {
    fontSize: 14,
    color: COLORS.primaryLight,
    fontWeight: '600',
    marginTop: 6,
  },
  illustrationBox: {
    width: '100%',
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    justifyContent: 'flex-end',
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  overlayGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(11, 15, 25, 0.85)',
    padding: 14,
    margin: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  glassText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  featureItem: {
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.cardBg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    flex: 1,
    marginHorizontal: 4,
  },
  featureLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
  },
  footerNote: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
});
