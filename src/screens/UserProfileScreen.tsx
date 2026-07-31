import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { ProgressRing } from '../components/ProgressRing';
import { COLORS, SHADOWS } from '../theme/colors';

interface UserProfileScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ onBack, onNavigate, onLogout }) => {
  const { userProfile } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'conditions' | 'settings'>('overview');

  const PROFILE_STATS = [
    { label: 'Health Score', val: `${userProfile.healthScore}`, icon: 'star' as const, color: COLORS.primary },
    { label: 'BMI', val: (userProfile.bmi ?? 23.5).toFixed(1), icon: 'body' as const, color: COLORS.accent },
    { label: 'Goal', val: 'Protect', icon: 'shield-checkmark' as const, color: COLORS.secondary },
    { label: 'Streak', val: '14d', icon: 'flame' as const, color: COLORS.warning },
  ];

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AnimatedAppBar
          title="My Profile"
          showBack
          onBack={onBack}
          rightActionIcon="settings-outline"
          onRightAction={() => {}}
        />

        {/* Profile Hero */}
        <View style={[styles.profileHero, SHADOWS.md]}>
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }}
              style={styles.avatar}
            />
            <AnimatedPressable style={styles.avatarEditBtn} scaleTo={0.9}>
              <Ionicons name="camera" size={13} color={COLORS.white} />
            </AnimatedPressable>
          </View>
          <View style={styles.heroMeta}>
            <Text style={styles.heroName}>{userProfile.name}</Text>
            <Text style={styles.heroConditions}>{userProfile.diseases?.join(' · ')}</Text>
            <Text style={styles.heroBio}>Precision nutrition & disease prevention member since 2024</Text>
            <View style={styles.memberBadge}>
              <Ionicons name="diamond" size={11} color={COLORS.accentLight} />
              <Text style={styles.memberText}>Premium Health Member</Text>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {PROFILE_STATS.map((s) => (
            <View key={s.label} style={[styles.statPill, SHADOWS.xs]}>
              <Ionicons name={s.icon} size={14} color={s.color} />
              <Text style={[styles.statVal, { color: s.color }]}>{s.val}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabsBar}>
          {(['overview', 'conditions', 'settings'] as const).map((t) => (
            <AnimatedPressable key={t} style={[styles.tab, activeTab === t && styles.tabActive]} onPress={() => setActiveTab(t)} scaleTo={0.96}>
              <Text style={[styles.tabLabel, activeTab === t && styles.tabLabelActive]}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </AnimatedPressable>
          ))}
        </View>

        {activeTab === 'overview' && (
          <>
            {/* Health Ring Overview */}
            <GlassCard title="Clinical Health Overview" subtitle="Composite metabolic snapshot">
              <View style={styles.overviewRow}>
                <ProgressRing size={100} strokeWidth={9} progress={userProfile.healthScore} gradientColors={['#4F6EF7', '#7B61FF']} id="profile-ring">
                  <Text style={styles.miniRingScore}>{userProfile.healthScore}</Text>
                </ProgressRing>
                <View style={styles.overviewMeta}>
                  {[
                    { label: 'Daily Calories', val: `${userProfile.dailyCalorieTarget} kcal`, icon: 'flame' as const },
                    { label: 'Weight', val: `${userProfile.weight} kg`, icon: 'body' as const },
                    { label: 'Height', val: `${userProfile.height} cm`, icon: 'resize' as const },
                    { label: 'Age', val: `${userProfile.age} years`, icon: 'time' as const },
                  ].map((m) => (
                    <View key={m.label} style={styles.overviewLine}>
                      <Ionicons name={m.icon} size={13} color={COLORS.primary} />
                      <Text style={styles.overviewLabel}>{m.label}</Text>
                      <Text style={styles.overviewVal}>{m.val}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </GlassCard>

            {/* Achievements */}
            <Text style={styles.sectionTitle}>Achievements</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[
                { name: '7-Day Streak', icon: 'flame', color: COLORS.warning, done: true },
                { name: 'First AI Scan', icon: 'camera', color: COLORS.primary, done: true },
                { name: 'Disease Guardian', icon: 'shield-checkmark', color: COLORS.secondary, done: true },
                { name: '30-Day Streak', icon: 'star', color: COLORS.accent, done: false },
                { name: 'Health Twin', icon: 'body', color: COLORS.danger, done: false },
              ].map((a) => (
                <View key={a.name} style={[styles.achieveCard, SHADOWS.xs, { opacity: a.done ? 1 : 0.45 }]}>
                  <View style={[styles.achieveIcon, { backgroundColor: a.color + '15' }]}>
                    <Ionicons name={a.icon as any} size={20} color={a.done ? a.color : COLORS.textMuted} />
                  </View>
                  <Text style={styles.achieveName}>{a.name}</Text>
                  {a.done && <Ionicons name="checkmark-circle" size={14} color={COLORS.secondary} />}
                </View>
              ))}
            </ScrollView>
          </>
        )}

        {activeTab === 'conditions' && (
          <>
            {userProfile.diseases?.map((disease, i) => (
              <GlassCard
                key={i}
                variant="outline"
                icon="medical"
                iconColor={COLORS.danger}
                iconBg={COLORS.dangerSubtle}
                title={disease}
                subtitle="Actively monitored · AI prevention mode"
                badgeText="Tracked"
                badgeColor={COLORS.primary}
                ctaText="AI Disease Coach"
                onCtaPress={() => onNavigate('AIAgentCoach')}
              >
                <Text style={styles.condText}>Real-time dietary AI optimized to prevent flare-ups and reduce long-term risk.</Text>
              </GlassCard>
            ))}
            <PrimaryButton variant="accent" title="Run Full Disease Risk Assessment" icon="analytics" onPress={() => onNavigate('DiseaseRiskAnalysis')} />
          </>
        )}

        {activeTab === 'settings' && (
          <>
            {[
              { label: 'Dietary Preferences', icon: 'nutrition', color: COLORS.secondary },
              { label: 'Allergy & Intolerances', icon: 'warning', color: COLORS.warning },
              { label: 'Health Goals', icon: 'trophy', color: COLORS.primary },
              { label: 'Notification Settings', icon: 'notifications', color: COLORS.accent },
              { label: 'Privacy & Data', icon: 'lock-closed', color: COLORS.textSecondary },
              { label: 'AI Personalization', icon: 'sparkles', color: COLORS.accent },
              { label: 'Export Health Report', icon: 'download', color: COLORS.secondary },
            ].map((s) => (
              <AnimatedPressable key={s.label} style={[styles.settingRow, SHADOWS.xs]} scaleTo={0.98}>
                <View style={[styles.settingIcon, { backgroundColor: s.color + '15' }]}>
                  <Ionicons name={s.icon as any} size={17} color={s.color} />
                </View>
                <Text style={styles.settingLabel}>{s.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
              </AnimatedPressable>
            ))}

            <AnimatedPressable style={[styles.logoutBtn, SHADOWS.xs]} onPress={onLogout} scaleTo={0.97}>
              <Ionicons name="log-out" size={18} color={COLORS.danger} />
              <Text style={styles.logoutText}>Sign Out</Text>
            </AnimatedPressable>
          </>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 20 },
  profileHero: {
    backgroundColor: COLORS.darkPanel,
    borderRadius: 28,
    padding: 20,
    flexDirection: 'row',
    gap: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.darkStroke,
  },
  avatarWrap: { position: 'relative', alignSelf: 'flex-start' },
  avatar: { width: 72, height: 72, borderRadius: 24, borderWidth: 3, borderColor: COLORS.primary },
  avatarEditBtn: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.darkPanel,
  },
  heroMeta: { flex: 1 },
  heroName: { fontSize: 22, fontWeight: '900', color: COLORS.darkText, letterSpacing: -0.4 },
  heroConditions: { fontSize: 11, fontWeight: '600', color: 'rgba(228,231,255,0.6)', marginTop: 3 },
  heroBio: { fontSize: 11, fontWeight: '500', color: 'rgba(228,231,255,0.45)', marginTop: 4, lineHeight: 16 },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(123,97,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  memberText: { fontSize: 10, fontWeight: '800', color: COLORS.accentLight },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  statPill: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: 'rgba(200,207,228,0.55)',
  },
  statVal: { fontSize: 15, fontWeight: '900', letterSpacing: -0.3 },
  statLabel: { fontSize: 9, fontWeight: '600', color: COLORS.textMuted, textAlign: 'center' },
  tabsBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(200,207,228,0.25)',
    borderRadius: 14,
    padding: 4,
    gap: 4,
    marginBottom: 12,
  },
  tab: { flex: 1, paddingVertical: 9, borderRadius: 11, alignItems: 'center' },
  tabActive: { backgroundColor: COLORS.white, ...SHADOWS.xs },
  tabLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  tabLabelActive: { fontWeight: '800', color: COLORS.primary },
  overviewRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  miniRingScore: { fontSize: 22, fontWeight: '900', color: COLORS.textPrimary },
  overviewMeta: { flex: 1, gap: 6 },
  overviewLine: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  overviewLabel: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, flex: 1 },
  overviewVal: { fontSize: 12, fontWeight: '800', color: COLORS.textPrimary },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: -0.3, marginTop: 12, marginBottom: 10 },
  achieveCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 18,
    padding: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(200,207,228,0.55)',
    alignItems: 'center',
    width: 110,
    gap: 6,
    marginBottom: 4,
  },
  achieveIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  achieveName: { fontSize: 11, fontWeight: '800', color: COLORS.textPrimary, textAlign: 'center' },
  condText: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 19, marginTop: 4 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 16,
    padding: 14,
    gap: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(200,207,228,0.55)',
  },
  settingIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  settingLabel: { flex: 1, fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.dangerSubtle,
    borderRadius: 16,
    padding: 15,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,92,122,0.25)',
    marginTop: 8,
  },
  logoutText: { fontSize: 15, fontWeight: '800', color: COLORS.danger },
});
