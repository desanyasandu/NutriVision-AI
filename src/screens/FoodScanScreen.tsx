import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

interface FoodScanScreenProps {
  onBack: () => void;
  onScanComplete: () => void;
  onVoiceScan: () => void;
}

export const FoodScanScreen: React.FC<FoodScanScreenProps> = ({
  onBack,
  onScanComplete,
  onVoiceScan,
}) => {
  const { foodHistory } = useApp();
  const [selectedScan, setSelectedScan] = useState<string | null>(null);

  // Animated Scan Beam Target
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scanLineAnim]);

  const translateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 220],
  });

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Floating App Bar */}
        <AnimatedAppBar
          title="Food Scanner AI"
          subtitle="Instant Macro & Disease Analysis"
          showBack
          onBack={onBack}
          rightActionIcon="mic"
          onRightAction={onVoiceScan}
        />

        {/* Large Camera Card with Live Preview & Blue Glowing Corners */}
        <View style={[styles.cameraCard, SHADOWS.lg]}>
          {/* Live Viewfinder Image Background Simulation */}
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
            }}
            style={styles.viewfinderBg}
          />
          <View style={styles.viewfinderOverlay} />

          {/* Blue Glowing Corners */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

          {/* Animated Laser Scanning Line */}
          <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />

          {/* AI Focus Target Box */}
          <View style={styles.focusBox}>
            <View style={styles.focusBadge}>
              <Ionicons name="sparkles" size={12} color={COLORS.white} />
              <Text style={styles.focusBadgeText}>AI Auto-Focus: Cheese Burger (97%)</Text>
            </View>
          </View>

          {/* Floating Capture FAB */}
          <AnimatedPressable style={styles.captureFabWrapper} onPress={onScanComplete}>
            <View style={[styles.captureFab, SHADOWS.glow]}>
              <Ionicons name="camera" size={28} color={COLORS.white} />
            </View>
          </AnimatedPressable>
        </View>

        {/* AI Confidence & Real-Time Status Animation */}
        <GlassCard variant="glass" style={styles.confidenceCard}>
          <View style={styles.confidenceRow}>
            <View style={styles.aiBadgeBox}>
              <Ionicons name="hardware-chip" size={18} color={COLORS.primary} />
            </View>
            <View style={styles.confidenceTextCol}>
              <Text style={styles.confidenceTitle}>Neural Vision v2.4 Active</Text>
              <Text style={styles.confidenceSub}>High accuracy multi-ingredient segmentation enabled</Text>
            </View>
            <View style={styles.percentBadge}>
              <Text style={styles.percentText}>99.4%</Text>
            </View>
          </View>
        </GlassCard>

        {/* Primary Capture Action Button */}
        <PrimaryButton
          title="Capture & Analyze Food"
          icon="scan-outline"
          onPress={onScanComplete}
          style={styles.mainBtn}
        />

        {/* Recent Scans Carousel */}
        <Text style={styles.sectionTitle}>Recent Food Scans</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scansCarousel}>
          {foodHistory.map((item) => (
            <AnimatedPressable
              key={item.id}
              style={[styles.carouselCard, SHADOWS.sm]}
              onPress={onScanComplete}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.carouselImg} />
              <View style={styles.carouselInfo}>
                <Text style={styles.carouselName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.carouselCal}>{item.calories} kcal</Text>
                <View style={styles.carouselBadge}>
                  <Text style={styles.carouselBadgeText}>Score: {item.healthScore}</Text>
                </View>
              </View>
            </AnimatedPressable>
          ))}
        </ScrollView>

        {/* AI Scanning Tips Section */}
        <GlassCard
          icon="bulb-outline"
          iconColor={COLORS.warning}
          iconBg="rgba(245, 158, 11, 0.12)"
          title="Optimal Scanning Tips"
          subtitle="Ensure maximum clinical accuracy"
        >
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Keep camera 20cm above the food plate in clear light.</Text>
            <Text style={styles.tipItem}>• Ensure sauces, buns, and toppings are fully visible.</Text>
            <Text style={styles.tipItem}>• Use Voice Assistant if scanning multi-course meals.</Text>
          </View>
        </GlassCard>

        <View style={{ height: 40 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  cameraCard: {
    height: 280,
    borderRadius: DESIGN_TOKENS.borderRadius.card, // 24
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(59, 130, 246, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewfinderBg: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  viewfinderOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#3B82F6',
    borderWidth: 4,
  },
  topLeft: {
    top: 16,
    left: 16,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 10,
  },
  topRight: {
    top: 16,
    right: 16,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 10,
  },
  bottomLeft: {
    bottom: 16,
    left: 16,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
  },
  bottomRight: {
    bottom: 16,
    right: 16,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 10,
  },
  scanLine: {
    position: 'absolute',
    left: 24,
    right: 24,
    height: 3,
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderRadius: 2,
    zIndex: 5,
  },
  focusBox: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 6,
  },
  focusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  focusBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.white,
  },
  captureFabWrapper: {
    position: 'absolute',
    bottom: 16,
    zIndex: 10,
  },
  captureFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  confidenceCard: {
    marginVertical: 6,
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiBadgeBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  confidenceTextCol: {
    flex: 1,
  },
  confidenceTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  confidenceSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginTop: 1,
  },
  percentBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  percentText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.secondaryDark,
  },
  mainBtn: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: DESIGN_TOKENS.fontSize.sectionTitle, // 22
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    marginTop: 16,
    marginBottom: 10,
  },
  scansCarousel: {
    flexDirection: 'row',
    marginVertical: 6,
    paddingBottom: 8,
  },
  carouselCard: {
    width: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  carouselImg: {
    width: '100%',
    height: 90,
  },
  carouselInfo: {
    padding: 10,
  },
  carouselName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  carouselCal: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  carouselBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  carouselBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
  },
  tipsList: {
    gap: 6,
    marginTop: 4,
  },
  tipItem: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
});
