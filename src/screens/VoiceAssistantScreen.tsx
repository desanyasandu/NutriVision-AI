import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Rect } from 'react-native-svg';
import { LayeredBackground } from '../components/LayeredBackground';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

interface VoiceAssistantScreenProps {
  onBack: () => void;
  onNavigateToAgent: () => void;
}

const TRANSCRIPTIONS = [
  'Listening to your voice...',
  '"Log my lunch: Grilled chicken salad with olive oil and sparkling water..."',
  '"Scanning macros: 340 kcal, 36g Protein. Migraine trigger level: SAFE."',
];

export const VoiceAssistantScreen: React.FC<VoiceAssistantScreenProps> = ({
  onBack,
  onNavigateToAgent,
}) => {
  const [transIndex, setTransIndex] = useState(0);
  const orbScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulsing Glowing AI Orb Animation
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(orbScale, {
          toValue: 1.2,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(orbScale, {
          toValue: 1.0,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();

    const interval = setInterval(() => {
      setTransIndex((prev) => (prev < TRANSCRIPTIONS.length - 1 ? prev + 1 : prev));
    }, 2200);

    return () => {
      loop.stop();
      clearInterval(interval);
    };
  }, [orbScale]);

  return (
    <LayeredBackground style={styles.fullContainer}>
      {/* Top Header Row */}
      <View style={styles.headerRow}>
        <AnimatedPressable style={styles.closeBtn} onPress={onBack}>
          <Ionicons name="close" size={24} color={COLORS.textPrimary} />
        </AnimatedPressable>

        <Text style={styles.assistantHeaderTitle}>Voice Neural Assistant</Text>

        <AnimatedPressable style={styles.agentShortcutBtn} onPress={onNavigateToAgent}>
          <Ionicons name="sparkles" size={18} color={COLORS.accent} />
        </AnimatedPressable>
      </View>

      {/* Main Full-Screen Glowing Pulsing AI Orb */}
      <View style={styles.centerVisualizer}>
        <Animated.View
          style={[
            styles.glowingOrbOuter,
            SHADOWS.glow,
            { transform: [{ scale: orbScale }] },
          ]}
        >
          <View style={styles.glowingOrbInner}>
            <Ionicons name="mic" size={48} color={COLORS.white} />
          </View>
        </Animated.View>

        {/* Live Audio Waves Visualizer Bar Mockup */}
        <View style={styles.audioWaveRow}>
          {[40, 70, 30, 90, 50, 80, 45, 95, 60, 35].map((h, i) => (
            <View key={i} style={[styles.waveBar, { height: h }]} />
          ))}
        </View>

        <Text style={styles.listeningStatus}>Voice Recognition Active</Text>
      </View>

      {/* Live Speech Transcription Card */}
      <GlassCard variant="glass" style={styles.transcriptionCard}>
        <View style={styles.transHeaderRow}>
          <View style={styles.recDot} />
          <Text style={styles.transHeaderTitle}>LIVE TRANSCRIPTION</Text>
        </View>
        <Text style={styles.transcriptionBody}>{TRANSCRIPTIONS[transIndex]}</Text>
      </GlassCard>

      {/* Action Bar */}
      <View style={styles.bottomBar}>
        <PrimaryButton
          title="Analyze Speech Log"
          icon="sparkles-outline"
          onPress={onNavigateToAgent}
        />
      </View>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  closeBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  assistantHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  agentShortcutBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.2)',
  },
  centerVisualizer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  glowingOrbOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.6,
    shadowRadius: 30,
  },
  glowingOrbInner: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1D4ED8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioWaveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 36,
    height: 100,
  },
  waveBar: {
    width: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  listeningStatus: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: 16,
  },
  transcriptionCard: {
    marginVertical: 10,
    padding: 18,
  },
  transHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  recDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.danger,
  },
  transHeaderTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.textMuted,
    letterSpacing: 0.8,
  },
  transcriptionBody: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 23,
    fontStyle: 'italic',
  },
  bottomBar: {
    marginBottom: 20,
  },
});
