import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Animated, Easing, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient, Stop, Ellipse, Circle, Path, Rect } from 'react-native-svg';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { ProgressRing } from '../components/ProgressRing';
import { COLORS, SHADOWS } from '../theme/colors';

interface DigitalHealthTwinScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const ORGAN_SYSTEMS = [
  { id: 'cardio', label: 'Cardiovascular', score: 82, risk: 'Low', color: COLORS.danger, icon: 'heart' as const, desc: 'Normal BP · Resting BPM 72' },
  { id: 'meta', label: 'Metabolic', score: 67, risk: 'Moderate', color: COLORS.warning, icon: 'flame' as const, desc: 'Pre-diabetic monitoring active' },
  { id: 'neuro', label: 'Neurological', score: 74, risk: 'Low', color: COLORS.accent, icon: 'flash' as const, desc: 'Migraine risk: 28% this week' },
  { id: 'digest', label: 'Digestive', score: 89, risk: 'Minimal', color: COLORS.secondary, icon: 'leaf' as const, desc: 'Fiber intake optimal' },
  { id: 'renal', label: 'Renal', score: 91, risk: 'Minimal', color: COLORS.primaryLight, icon: 'water' as const, desc: 'Hydration markers good' },
];

export const DigitalHealthTwinScreen: React.FC<DigitalHealthTwinScreenProps> = ({ onBack, onNavigate }) => {
  const { userProfile } = useApp();
  const [selectedOrgan, setSelectedOrgan] = useState('cardio');
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.04, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -8, duration: 3000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(floatAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
  }, [pulseAnim, floatAnim]);

  const selected = ORGAN_SYSTEMS.find((o) => o.id === selectedOrgan) || ORGAN_SYSTEMS[0];

  return (
    <LayeredBackground variant="violet">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AnimatedAppBar
          title="Digital Health Twin"
          subtitle="3D Predictive Organ Modeling"
          showBack
          onBack={onBack}
          rightActionIcon="share-outline"
          onRightAction={() => {}}
          dark
        />

        {/* 3D Figure Panel */}
        <Animated.View style={[styles.figurePanelOuter, { transform: [{ translateY: floatAnim }] }]}>
          <View style={[styles.figurePanel, SHADOWS.glowAccent]}>
            <Svg width="100%" height="280" viewBox="0 0 320 280">
              <Defs>
                <LinearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#7B61FF" stopOpacity="0.9" />
                  <Stop offset="100%" stopColor="#4F6EF7" stopOpacity="0.9" />
                </LinearGradient>
                <LinearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#7B61FF" stopOpacity="0.3" />
                  <Stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </LinearGradient>
              </Defs>

              {/* Ground Glow */}
              <Ellipse cx={160} cy={265} rx={80} ry={12} fill="url(#glowGrad)" />

              {/* Body silhouette */}
              {/* Head */}
              <Circle cx={160} cy={52} r={30} fill="none" stroke="url(#bodyGrad)" strokeWidth="2" opacity={0.7} />
              {/* Neck */}
              <Rect x={152} y={80} width={16} height={18} rx={4} fill="none" stroke="url(#bodyGrad)" strokeWidth="2" opacity={0.6} />
              {/* Torso */}
              <Rect x={120} y={96} width={80} height={100} rx={10} fill="none" stroke="url(#bodyGrad)" strokeWidth="2" opacity={0.6} />
              {/* Arms */}
              <Path d="M120 100 L88 170" stroke="url(#bodyGrad)" strokeWidth="2.5" strokeLinecap="round" opacity={0.6} />
              <Path d="M200 100 L232 170" stroke="url(#bodyGrad)" strokeWidth="2.5" strokeLinecap="round" opacity={0.6} />
              {/* Legs */}
              <Path d="M145 196 L135 265" stroke="url(#bodyGrad)" strokeWidth="2.5" strokeLinecap="round" opacity={0.6} />
              <Path d="M175 196 L185 265" stroke="url(#bodyGrad)" strokeWidth="2.5" strokeLinecap="round" opacity={0.6} />

              {/* Heart pulse dot */}
              <Circle cx={148} cy={130} r={6} fill={COLORS.danger} opacity={0.9} />
              <Circle cx={148} cy={130} r={12} fill="none" stroke={COLORS.danger} strokeWidth="1.5" opacity={0.4} />

              {/* Metabolic center dot */}
              <Circle cx={160} cy={155} r={5} fill={COLORS.warning} opacity={0.85} />

              {/* Brain dot */}
              <Circle cx={160} cy={45} r={4} fill={COLORS.accent} opacity={0.85} />

              {/* Scan line */}
              <Animated.View />
              <Rect x={80} y={138} width={160} height={1.5} rx={0.75} fill={COLORS.primary} opacity={0.3} />

              {/* Score badge */}
              <Rect x={220} y={115} width={68} height={32} rx={10} fill="rgba(79,110,247,0.2)" />
              <Rect x={221} y={116} width={66} height={30} rx={9} fill="none" stroke="rgba(79,110,247,0.4)" strokeWidth="1" />
            </Svg>

            {/* Floating Score */}
            <View style={styles.floatingScore}>
              <Text style={styles.floatingScoreVal}>{userProfile.healthScore}</Text>
              <Text style={styles.floatingScoreLabel}>Twin Score</Text>
            </View>
          </View>
        </Animated.View>

        {/* Organ System Selector */}
        <View style={styles.organRow}>
          {ORGAN_SYSTEMS.map((sys) => (
            <AnimatedPressable
              key={sys.id}
              style={[styles.organBtn, selectedOrgan === sys.id && [styles.organBtnActive, { borderColor: sys.color + '60', backgroundColor: sys.color + '15' }]]}
              onPress={() => setSelectedOrgan(sys.id)}
              scaleTo={0.92}
            >
              <Ionicons name={sys.icon} size={17} color={selectedOrgan === sys.id ? sys.color : 'rgba(228,231,255,0.4)'} />
            </AnimatedPressable>
          ))}
        </View>

        {/* Selected System Detail */}
        <View style={[styles.systemDetail, SHADOWS.md]}>
          <View style={styles.systemDetailHeader}>
            <View style={[styles.systemDetailIcon, { backgroundColor: selected.color + '20' }]}>
              <Ionicons name={selected.icon} size={22} color={selected.color} />
            </View>
            <View style={styles.systemDetailMeta}>
              <Text style={styles.systemDetailName}>{selected.label}</Text>
              <Text style={styles.systemDetailDesc}>{selected.desc}</Text>
            </View>
            <View style={[styles.riskBadge, {
              backgroundColor: selected.risk === 'Low' || selected.risk === 'Minimal' ? 'rgba(0,196,140,0.15)' : 'rgba(255,170,0,0.15)',
            }]}>
              <Text style={[styles.riskText, {
                color: selected.risk === 'Low' || selected.risk === 'Minimal' ? COLORS.secondary : COLORS.warning,
              }]}>{selected.risk}</Text>
            </View>
          </View>

          <ProgressRing
            size={90}
            strokeWidth={8}
            progress={selected.score}
            gradientColors={[selected.color, selected.color + 'AA']}
            id={`twin-${selected.id}`}
            trackColor="rgba(255,255,255,0.08)"
          >
            <Text style={[styles.sysMiniScore, { color: COLORS.darkText }]}>{selected.score}</Text>
          </ProgressRing>
        </View>

        {/* All System Scores */}
        <Text style={styles.sectionTitle}>Full System Map</Text>
        {ORGAN_SYSTEMS.map((sys) => (
          <AnimatedPressable key={sys.id} onPress={() => setSelectedOrgan(sys.id)} style={[styles.sysRow, SHADOWS.xs]} scaleTo={0.98}>
            <View style={[styles.sysRowIcon, { backgroundColor: sys.color + '20' }]}>
              <Ionicons name={sys.icon} size={15} color={sys.color} />
            </View>
            <View style={styles.sysRowMeta}>
              <Text style={styles.sysRowName}>{sys.label}</Text>
              <Text style={styles.sysRowDesc}>{sys.desc}</Text>
            </View>
            <Text style={[styles.sysRowScore, { color: sys.color }]}>{sys.score}</Text>
            <View style={styles.sysRowTrack}>
              <View style={[styles.sysRowFill, { width: `${sys.score}%`, backgroundColor: sys.color }]} />
            </View>
          </AnimatedPressable>
        ))}

        <PrimaryButton
          variant="accent"
          waterEffect={true}
          waterVariant="cyan"
          title="Generate Full Prediction Report"
          icon="document-text"
          onPress={() => onNavigate('DiseaseRiskAnalysis')}
          style={{ marginTop: 14 }}
        />

        <View style={{ height: 30 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 20 },
  figurePanelOuter: { marginVertical: 10 },
  figurePanel: {
    backgroundColor: '#1A1240',
    borderRadius: 28,
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123, 97, 255, 0.2)',
    position: 'relative',
  },
  floatingScore: {
    position: 'absolute',
    top: 20,
    right: 24,
    backgroundColor: 'rgba(79,110,247,0.25)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(79,110,247,0.4)',
    alignItems: 'center',
  },
  floatingScoreVal: { fontSize: 22, fontWeight: '900', color: COLORS.white },
  floatingScoreLabel: { fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.6)' },
  organRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 12,
  },
  organBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  organBtnActive: { borderWidth: 2 },
  systemDetail: {
    backgroundColor: '#1A1240',
    borderRadius: 24,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(123,97,255,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  systemDetailHeader: { flex: 1, flexDirection: 'column', gap: 8 },
  systemDetailIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  systemDetailMeta: { flex: 1 },
  systemDetailName: { fontSize: 16, fontWeight: '900', color: COLORS.darkText },
  systemDetailDesc: { fontSize: 12, fontWeight: '500', color: 'rgba(228,231,255,0.55)', marginTop: 2 },
  riskBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, alignSelf: 'flex-start' },
  riskText: { fontSize: 11, fontWeight: '800' },
  sysMiniScore: { fontSize: 20, fontWeight: '900' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.darkText, letterSpacing: -0.3, marginTop: 4, marginBottom: 10 },
  sysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    gap: 10,
  },
  sysRowIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  sysRowMeta: { flex: 1 },
  sysRowName: { fontSize: 13, fontWeight: '800', color: COLORS.darkText },
  sysRowDesc: { fontSize: 11, color: 'rgba(228,231,255,0.5)', marginTop: 1 },
  sysRowScore: { fontSize: 20, fontWeight: '900', marginRight: 8 },
  sysRowTrack: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 2.5, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.06)', overflow: 'hidden' },
  sysRowFill: { height: '100%', borderRadius: 99 },
});
