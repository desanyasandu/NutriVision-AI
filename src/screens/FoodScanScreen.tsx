import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

interface FoodScanScreenProps {
  onBack: () => void;
  onScanComplete: () => void;
  onVoiceScan: () => void;
}

export const FoodScanScreen: React.FC<FoodScanScreenProps> = ({ onBack, onScanComplete, onVoiceScan }) => {
  const { foodHistory } = useApp();
  const scanLine = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, { toValue: 1, duration: 2500, easing: Easing.inOut(Easing.sine), useNativeDriver: true }),
        Animated.timing(scanLine, { toValue: 0, duration: 2500, easing: Easing.inOut(Easing.sine), useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 1600, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1600, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    ).start();
  }, [scanLine, pulseAnim]);

  const scanY = scanLine.interpolate({ inputRange: [0, 1], outputRange: [10, 230] });

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AnimatedAppBar
          title="Food Scanner"
          subtitle="Neural Vision · AI Detection"
          showBack
          onBack={onBack}
          rightActionIcon="mic"
          onRightAction={onVoiceScan}
        />

        {/* Camera Viewfinder Card */}
        <View style={[styles.viewfinder, SHADOWS.lg]}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.dimOverlay} />

          {/* Corner Brackets */}
          {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map((pos) => (
            <View key={pos} style={[styles.corner, styles[pos]]} />
          ))}

          {/* Animated Laser Line */}
          <Animated.View style={[styles.laserLine, { transform: [{ translateY: scanY }] }]} />

          {/* AI Detection Badge */}
          <View style={styles.detectionBadge}>
            <View style={styles.detBadgeDot} />
            <Text style={styles.detBadgeText}>AI DETECTION · CHEESE BURGER · 97%</Text>
          </View>

          {/* Capture FAB */}
          <Animated.View style={[styles.fabWrap, { transform: [{ scale: pulseAnim }] }]}>
            <AnimatedPressable onPress={onScanComplete} scaleTo={0.88}>
              <View style={[styles.captureFab, SHADOWS.glow]}>
                <Ionicons name="camera" size={28} color={COLORS.white} />
              </View>
            </AnimatedPressable>
          </Animated.View>
        </View>

        {/* Neural Status Card */}
        <GlassCard variant="outline">
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: COLORS.secondary }]} />
            <View style={styles.statusText}>
              <Text style={styles.statusTitle}>Neural Vision v2.4 · Active</Text>
              <Text style={styles.statusSub}>Multi-ingredient segmentation · Precision Mode</Text>
            </View>
            <View style={styles.confPill}>
              <Text style={styles.confText}>99.4%</Text>
            </View>
          </View>
        </GlassCard>

        <PrimaryButton title="Capture & Analyze" icon="scan" onPress={onScanComplete} />

        {/* Recent Scans */}
        <Text style={styles.sectionTitle}>Recent Scans</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {foodHistory.map((item) => (
            <AnimatedPressable key={item.id} style={[styles.scanCard, SHADOWS.sm]} onPress={onScanComplete} scaleTo={0.96}>
              <Image source={{ uri: item.imageUrl }} style={styles.scanImg} />
              <View style={styles.scanMeta}>
                <Text style={styles.scanName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.scanCal}>{item.calories} kcal</Text>
                <View style={[styles.scanScore, { backgroundColor: item.healthScore > 70 ? COLORS.secondarySubtle : COLORS.warningSubtle }]}>
                  <Text style={[styles.scanScoreText, { color: item.healthScore > 70 ? COLORS.secondary : COLORS.warningDark }]}>
                    {item.healthScore}/100
                  </Text>
                </View>
              </View>
            </AnimatedPressable>
          ))}
        </ScrollView>

        {/* Tips */}
        <GlassCard icon="bulb-outline" iconColor={COLORS.warning} iconBg={COLORS.warningSubtle} title="Scanning Tips" subtitle="For maximum AI accuracy">
          {[
            'Hold camera 20cm above the food plate',
            'Ensure sauces and toppings are fully visible',
            'Use Voice Mode for multi-course meal logging',
          ].map((tip, i) => (
            <Text key={i} style={styles.tipText}>• {tip}</Text>
          ))}
        </GlassCard>

        <View style={{ height: 30 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 20 },
  viewfinder: {
    height: 290,
    borderRadius: 26,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(79, 110, 247, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dimOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(13, 14, 26, 0.3)',
  },
  corner: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderColor: COLORS.primary,
    borderWidth: 3.5,
  },
  topLeft: { top: 18, left: 18, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 8 },
  topRight: { top: 18, right: 18, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 8 },
  bottomLeft: { bottom: 18, left: 18, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 8 },
  bottomRight: { bottom: 18, right: 18, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 8 },
  laserLine: {
    position: 'absolute',
    left: 22,
    right: 22,
    height: 2.5,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    shadowColor: COLORS.primary,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  detectionBadge: {
    position: 'absolute',
    top: 18,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13,14,26,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 99,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  detBadgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.secondary },
  detBadgeText: { fontSize: 10, fontWeight: '800', color: COLORS.white, letterSpacing: 0.5 },
  fabWrap: {
    position: 'absolute',
    bottom: 20,
  },
  captureFab: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3.5,
    borderColor: COLORS.white,
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statusDot: { width: 9, height: 9, borderRadius: 4.5 },
  statusText: { flex: 1 },
  statusTitle: { fontSize: 13, fontWeight: '800', color: COLORS.textPrimary },
  statusSub: { fontSize: 11, color: COLORS.textSecondary, marginTop: 1 },
  confPill: { backgroundColor: COLORS.secondarySubtle, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(0,196,140,0.2)' },
  confText: { fontSize: 12, fontWeight: '900', color: COLORS.secondary },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: -0.3, marginTop: 14, marginBottom: 10 },
  scanCard: {
    width: 136,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(200,207,228,0.55)',
    marginBottom: 8,
  },
  scanImg: { width: '100%', height: 88 },
  scanMeta: { padding: 10 },
  scanName: { fontSize: 12, fontWeight: '800', color: COLORS.textPrimary },
  scanCal: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  scanScore: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6, alignSelf: 'flex-start', marginTop: 5 },
  scanScoreText: { fontSize: 10, fontWeight: '800' },
  tipText: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20, marginTop: 4 },
});
