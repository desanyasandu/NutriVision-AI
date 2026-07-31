import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { MOCK_RECENT_FOODS } from '../data/mockData';
import { Header } from '../components/Header';
import { StepProgressBar } from '../components/StepProgressBar';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

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
  const { setCurrentScan } = useApp();
  const [flash, setFlash] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<'burger' | 'salad'>('burger');

  const foodImages = {
    burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    salad: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  };

  const handleSelectPreset = (preset: 'burger' | 'salad') => {
    setSelectedPreset(preset);
    if (preset === 'burger') {
      setCurrentScan(MOCK_RECENT_FOODS[0]);
    } else {
      setCurrentScan(MOCK_RECENT_FOODS[1]);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Food Vision Scanner"
        subtitle="AI Object & Ingredient Detection"
        showBack
        onBack={onBack}
        rightAction={
          <AnimatedPressable onPress={() => setFlash(!flash)} style={styles.flashBtn}>
            <Ionicons
              name={flash ? 'flash' : 'flash-outline'}
              size={22}
              color={flash ? COLORS.secondary : COLORS.textPrimary}
            />
          </AnimatedPressable>
        }
      />

      <StepProgressBar currentStep={1} />

      {/* Camera Viewfinder */}
      <View style={styles.viewfinderContainer}>
        <Image source={{ uri: foodImages[selectedPreset] }} style={styles.cameraPreview} />

        {/* Viewfinder Target Box Overlay */}
        <View style={styles.targetOverlay}>
          <View style={styles.targetFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            <View style={styles.scanInstructionBadge}>
              <Ionicons name="scan" size={16} color={COLORS.primary} />
              <Text style={styles.scanInstructionText}>Position food inside frame</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Sample Scan Preset Selector */}
      <View style={styles.demoPresetContainer}>
        <Text style={styles.demoLabel}>Sample Meal Presets (For Demo Testing):</Text>
        <View style={styles.presetButtons}>
          <AnimatedPressable
            style={[styles.presetBtn, selectedPreset === 'burger' && styles.presetBtnActive]}
            onPress={() => handleSelectPreset('burger')}
          >
            <Text style={[styles.presetText, selectedPreset === 'burger' && styles.presetTextActive]}>
              Cheese Burger
            </Text>
          </AnimatedPressable>

          <AnimatedPressable
            style={[styles.presetBtn, selectedPreset === 'salad' && styles.presetBtnActive]}
            onPress={() => handleSelectPreset('salad')}
          >
            <Text style={[styles.presetText, selectedPreset === 'salad' && styles.presetTextActive]}>
              Grilled Chicken Salad
            </Text>
          </AnimatedPressable>
        </View>
      </View>

      {/* Bottom Camera Action Bar */}
      <View style={styles.bottomBar}>
        <AnimatedPressable style={styles.sideBtn} onPress={onVoiceScan}>
          <Ionicons name="mic" size={24} color={COLORS.textPrimary} />
          <Text style={styles.sideBtnText}>Voice Scan</Text>
        </AnimatedPressable>

        <AnimatedPressable
          style={[styles.shutterBtn, SHADOWS.glow]}
          onPress={onScanComplete}
        >
          <View style={styles.shutterInner} />
        </AnimatedPressable>

        <AnimatedPressable style={styles.sideBtn} onPress={onScanComplete}>
          <Ionicons name="images" size={24} color={COLORS.textPrimary} />
          <Text style={styles.sideBtnText}>Gallery</Text>
        </AnimatedPressable>
      </View>

      <Text style={styles.hintText}>Tip: You can edit or refine ingredients after analysis</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flashBtn: {
    minHeight: 44,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewfinderContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    backgroundColor: '#0F172A',
    ...SHADOWS.md,
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  targetOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetFrame: {
    width: 220,
    height: 220,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderColor: COLORS.primary,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 14,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 14,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 14,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 14,
  },
  scanInstructionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.sm,
  },
  scanInstructionText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
  demoPresetContainer: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  demoLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 6,
    fontWeight: '600',
  },
  presetButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  presetBtn: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    minHeight: 44,
    justifyContent: 'center',
  },
  presetBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(33, 118, 255, 0.08)',
  },
  presetText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  presetTextActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  sideBtn: {
    alignItems: 'center',
    gap: 4,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
  },
  sideBtnText: {
    fontSize: 11,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  shutterBtn: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 4,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.primary,
  },
  hintText: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
});
