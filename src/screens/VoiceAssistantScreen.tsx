import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { LayeredBackground } from '../components/LayeredBackground';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { COLORS, SHADOWS } from '../theme/colors';

interface VoiceAssistantScreenProps {
  onBack: () => void;
  onNavigateToAgent: () => void;
}

const TRANSCRIPTIONS = [
  'Listening to your voice...',
  '"Log my lunch: Grilled chicken salad with olive oil..."',
  '"340 kcal · 36g Protein · Migraine trigger level: SAFE"',
];

export const VoiceAssistantScreen: React.FC<VoiceAssistantScreenProps> = ({ onBack, onNavigateToAgent }) => {
  const [transIndex, setTransIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const orbScale = useRef(new Animated.Value(1)).current;
  const ring1 = useRef(new Animated.Value(1)).current;
  const ring2 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!listening) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(orbScale, { toValue: 1.12, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(orbScale, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    const ring1Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(ring1, { toValue: 1.4, duration: 1600, useNativeDriver: true }),
        Animated.timing(ring1, { toValue: 1, duration: 0, useNativeDriver: true }),
      ])
    );
    const ring2Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(ring2, { toValue: 1.8, duration: 2200, useNativeDriver: true }),
        Animated.timing(ring2, { toValue: 1, duration: 0, useNativeDriver: true }),
      ])
    );
    loop.start();
    ring1Loop.start();
    ring2Loop.start();

    const int = setInterval(() => setTransIndex((p) => (p + 1) % TRANSCRIPTIONS.length), 2200);
    return () => { loop.stop(); ring1Loop.stop(); ring2Loop.stop(); clearInterval(int); };
  }, [listening, orbScale, ring1, ring2]);

  return (
    <LayeredBackground variant="dark">
      <AnimatedAppBar
        title="Voice AI"
        subtitle="Real-time voice food logging"
        showBack
        onBack={onBack}
        dark
      />

      <View style={styles.center}>
        {/* Animated Orb */}
        <View style={styles.orbWrap}>
          {listening && (
            <>
              <Animated.View style={[styles.pulseRing, styles.pulseRing2, { transform: [{ scale: ring2 }], opacity: ring2.interpolate({ inputRange: [1, 1.8], outputRange: [0.15, 0] }) }]} />
              <Animated.View style={[styles.pulseRing, { transform: [{ scale: ring1 }], opacity: ring1.interpolate({ inputRange: [1, 1.4], outputRange: [0.25, 0] }) }]} />
            </>
          )}
          <Animated.View style={[styles.orb, SHADOWS.glowAccent, { transform: [{ scale: orbScale }] }]}>
            <Svg width={120} height={120}>
              <Defs>
                <LinearGradient id="voiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#7B61FF" />
                  <Stop offset="100%" stopColor="#4F6EF7" />
                </LinearGradient>
              </Defs>
              <Circle cx={60} cy={60} r={60} fill="url(#voiceGrad)" />
            </Svg>
            <View style={styles.orbIconOverlay}>
              <Ionicons name={listening ? 'mic' : 'mic-outline'} size={40} color={COLORS.white} />
            </View>
          </Animated.View>
        </View>

        {/* Status */}
        <View style={styles.statusChip}>
          <View style={[styles.statusDot, { backgroundColor: listening ? COLORS.secondary : COLORS.textMuted }]} />
          <Text style={[styles.statusText, { color: listening ? COLORS.secondary : COLORS.textMuted }]}>
            {listening ? 'Listening...' : 'Tap to Start'}
          </Text>
        </View>

        {/* Transcription */}
        <View style={[styles.transcribeBox, SHADOWS.glass]}>
          <Text style={styles.transcribeText}>{TRANSCRIPTIONS[transIndex]}</Text>
        </View>

        {/* Toggle Button */}
        <AnimatedPressable
          style={[styles.listenBtn, { backgroundColor: listening ? COLORS.danger : COLORS.primary }, SHADOWS.glow]}
          onPress={() => setListening(!listening)}
          scaleTo={0.92}
        >
          <Ionicons name={listening ? 'stop' : 'mic'} size={22} color={COLORS.white} />
          <Text style={styles.listenBtnText}>{listening ? 'Stop Listening' : 'Start Voice Logging'}</Text>
        </AnimatedPressable>
      </View>

      {/* Capabilities */}
      <View style={styles.capsSection}>
        <GlassCard
          variant="dark"
          icon="sparkles"
          iconColor={COLORS.accentLight}
          title="Voice Capabilities"
          subtitle="What NutriVision Voice understands"
        >
          {[
            { icon: 'restaurant' as const, text: 'Log complete meals: "Grilled salmon with quinoa"' },
            { icon: 'analytics' as const, text: 'Ask for nutrition: "How much protein in my lunch?"' },
            { icon: 'shield-checkmark' as const, text: 'Disease check: "Is this safe for my migraine?"' },
            { icon: 'calendar' as const, text: 'Plan meals: "Schedule a low-sodium dinner tomorrow"' },
          ].map((c) => (
            <View key={c.text} style={styles.capRow}>
              <Ionicons name={c.icon} size={14} color={COLORS.accentLight} />
              <Text style={styles.capText}>{c.text}</Text>
            </View>
          ))}
        </GlassCard>

        <PrimaryButton
          variant="accent"
          title="Open Full AI Chat"
          icon="sparkles"
          onPress={onNavigateToAgent}
        />
      </View>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 20,
  },
  orbWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 180,
  },
  pulseRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  pulseRing2: {
    borderColor: COLORS.primary,
  },
  orb: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  orbIconOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statusDot: { width: 7, height: 7, borderRadius: 3.5 },
  statusText: { fontSize: 13, fontWeight: '700' },
  transcribeBox: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    width: '100%',
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transcribeText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(228,231,255,0.8)',
    textAlign: 'center',
    lineHeight: 21,
    fontStyle: 'italic',
  },
  listenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 18,
    gap: 8,
    width: '100%',
  },
  listenBtnText: { fontSize: 16, fontWeight: '800', color: COLORS.white },
  capsSection: { paddingHorizontal: 16, paddingBottom: 16, gap: 8 },
  capRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 5 },
  capText: { fontSize: 12, fontWeight: '500', color: 'rgba(228,231,255,0.65)', flex: 1 },
});
