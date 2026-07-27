import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { StepProgressBar } from '../components/StepProgressBar';
import { COLORS } from '../theme/colors';

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
  const [flash, setFlash] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<'burger' | 'salad'>('burger');

  const foodImages = {
    burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    salad: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  };

  return (
    <View style={styles.container}>
      <Header
        title="Food Vision Scanner"
        subtitle="AI Object & Ingredient Detection"
        showBack
        onBack={onBack}
        rightAction={
          <TouchableOpacity
            onPress={() => setFlash(!flash)}
            style={styles.flashBtn}
            accessibilityRole="button"
            accessibilityLabel="Toggle Camera Flash"
          >
            <Ionicons
              name={flash ? 'flash' : 'flash-outline'}
              size={22}
              color={flash ? COLORS.secondary : COLORS.jetBlack}
            />
          </TouchableOpacity>
        }
      />

      <StepProgressBar currentStep={1} />

      {/* Camera Viewfinder */}
      <View style={styles.viewfinderContainer}>
        <Image source={{ uri: foodImages[selectedPreset] }} style={styles.cameraPreview} />

        {/* Viewfinder Target Box Overlay */}
        <View style={styles.targetOverlay}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

          <View style={styles.scanInstructionBadge}>
            <Ionicons name="scan-outline" size={16} color={COLORS.primary} />
            <Text style={styles.scanInstructionText}>Position food inside frame</Text>
          </View>
        </View>
      </View>

      {/* Sample Scan Preset Selector */}
      <View style={styles.demoPresetContainer}>
        <Text style={styles.demoLabel}>Sample Meal Presets (For Demo Testing):</Text>
        <View style={styles.presetButtons}>
          <TouchableOpacity
            style={[styles.presetBtn, selectedPreset === 'burger' && styles.presetBtnActive]}
            onPress={() => setSelectedPreset('burger')}
            accessibilityRole="button"
            accessibilityLabel="Select Cheese Burger Preset"
          >
            <Text style={[styles.presetText, selectedPreset === 'burger' && styles.presetTextActive]}>
              Cheese Burger
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.presetBtn, selectedPreset === 'salad' && styles.presetBtnActive]}
            onPress={() => setSelectedPreset('salad')}
            accessibilityRole="button"
            accessibilityLabel="Select Chicken Salad Preset"
          >
            <Text style={[styles.presetText, selectedPreset === 'salad' && styles.presetTextActive]}>
              Grilled Chicken Salad
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Camera Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.sideBtn}
          onPress={onVoiceScan}
          accessibilityRole="button"
          accessibilityLabel="Switch to Voice Scan & Assistant"
        >
          <Ionicons name="mic-outline" size={24} color={COLORS.jetBlack} />
          <Text style={styles.sideBtnText}>Voice Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shutterBtn}
          onPress={onScanComplete}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Capture Food Photo"
        >
          <View style={styles.shutterInner} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBtn}
          onPress={onScanComplete}
          accessibilityRole="button"
          accessibilityLabel="Choose photo from Gallery"
        >
          <Ionicons name="images-outline" size={24} color={COLORS.jetBlack} />
          <Text style={styles.sideBtnText}>Gallery</Text>
        </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: '#000',
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  targetOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: COLORS.primary,
  },
  topLeft: {
    top: 40,
    left: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 40,
    right: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 40,
    left: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 40,
    right: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
  scanInstructionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  scanInstructionText: {
    fontSize: 12,
    color: COLORS.jetBlack,
    fontWeight: '700',
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
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
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
    color: COLORS.jetBlack,
    fontWeight: '600',
  },
  shutterBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
  },
  hintText: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: 16,
  },
});
