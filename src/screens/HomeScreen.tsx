import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { StatCard } from '../components/StatCard';
import { ProgressRing } from '../components/ProgressRing';
import { PrimaryButton } from '../components/PrimaryButton';
import { WaterButton } from '../components/WaterButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { userProfile, currentScan } = useApp();
  const calPct = Math.min(100, Math.round((userProfile.todayCaloriesConsumed / userProfile.dailyCalorieTarget) * 100));

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* App Bar */}
        <AnimatedAppBar
          showProfile
          onProfilePress={() => onNavigate('UserProfile')}
          rightActionIcon="notifications-outline"
          rightAction2Icon="sparkles-outline"
          onRightAction={() => onNavigate('AIAgentCoach')}
          onRightAction2={() => onNavigate('AIAgentCoach')}
        />

        {/* Greeting */}
        <View style={styles.greetingBlock}>
          <Text style={styles.greetingLabel}>THURSDAY · JUL 31</Text>
          <Text style={styles.greetingTitle}>Hello, {userProfile.name} 👋</Text>
          <Text style={styles.greetingSub}>Your metabolic health is looking great today.</Text>
        </View>

        {/* Hero Health Score Card — Dark Panel */}
        <View style={[styles.heroCard, SHADOWS.md]}>
          <View style={styles.heroCardInner}>
            {/* Left: Score Text */}
            <View style={styles.heroLeft}>
              <View style={styles.heroBadge}>
                <View style={styles.heroBadgeDot} />
                <Text style={styles.heroBadgeText}>Optimal Status</Text>
              </View>
              <Text style={styles.heroScore}>{userProfile.healthScore}</Text>
              <Text style={styles.heroScoreLabel}>Daily Health Score</Text>
              <Text style={styles.heroDesc}>
                Metabolic index, meal balance, and vulnerability modeling — all optimal.
              </Text>
              <AnimatedPressable style={styles.heroLink} onPress={() => onNavigate('DigitalHealthTwin')}>
                <Text style={styles.heroLinkText}>View 3D Twin</Text>
                <Ionicons name="arrow-forward" size={14} color={COLORS.primaryLight} />
              </AnimatedPressable>
            </View>

            {/* Right: Ring */}
            <ProgressRing
              size={116}
              strokeWidth={10}
              progress={userProfile.healthScore}
              gradientColors={['#7B61FF', '#00C48C']}
              id="home-health"
              trackColor="rgba(255,255,255,0.1)"
            >
              <Text style={styles.ringVal}>{userProfile.healthScore}</Text>
              <Text style={styles.ringLabel}>/100</Text>
            </ProgressRing>
          </View>
        </View>

        {/* Instant Water Button Scanner CTA */}
        <WaterButton
          title="Instant AI Food Scanner"
          icon="scan-outline"
          variant="cyan"
          size="lg"
          onPress={() => onNavigate('FoodScan')}
          style={{ marginVertical: 12 }}
        />

        {/* Vitals Header */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Today's Vitals</Text>
          <AnimatedPressable onPress={() => onNavigate('HealthDashboard')}>
            <Text style={styles.seeAll}>Dashboard →</Text>
          </AnimatedPressable>
        </View>

        {/* Stat Cards Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Calories"
            value={`${userProfile.todayCaloriesConsumed}`}
            unit={`/${userProfile.dailyCalorieTarget}`}
            icon="flame"
            iconColor={COLORS.primary}
            iconBg={COLORS.primarySubtle}
            progress={calPct}
            sparklineData={[320, 600, 850, 1100, userProfile.todayCaloriesConsumed]}
            onPress={() => onNavigate('NutritionAnalysis')}
          />
          <StatCard
            title="Hydration"
            value="1.8"
            unit="/2.5L"
            icon="water"
            iconColor="#0EA5E9"
            iconBg="rgba(14,165,233,0.12)"
            progress={72}
            trend="+0.3L"
            sparklineData={[0.4, 0.8, 1.2, 1.5, 1.8]}
            onPress={() => onNavigate('NutritionAnalysis')}
          />
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            title="Heart Rate"
            value="72"
            unit="BPM"
            icon="heart"
            iconColor={COLORS.danger}
            iconBg={COLORS.dangerSubtle}
            trend="Normal"
            sparklineData={[68, 72, 70, 74, 71, 72]}
            onPress={() => onNavigate('HealthDashboard')}
          />
          <StatCard
            title="Sleep"
            value="7h 45m"
            icon="moon"
            iconColor={COLORS.accent}
            iconBg={COLORS.accentSubtle}
            progress={87}
            trend="+45m"
            sparklineData={[6.2, 6.8, 7.1, 7.5, 7.75]}
            onPress={() => onNavigate('HealthDashboard')}
          />
        </View>

        {/* AI Recommendation Card */}
        <GlassCard
          variant="gradient"
          icon="sparkles"
          iconColor={COLORS.accent}
          iconBg={COLORS.accentSubtle}
          title="NutriVision Clinical AI"
          subtitle="Pre-Diabetes & Migraine Shield"
          badgeText="Live Insight"
          badgeColor={COLORS.accent}
          ctaText="Consult AI Assistant"
          onCtaPress={() => onNavigate('AIAgentCoach')}
        >
          <Text style={styles.aiAdvice}>
            "Your sodium intake today is at 57% daily limit from lunch alone. Choose a potassium-rich dinner like grilled salmon to protect vascular balance."
          </Text>
        </GlassCard>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actionsScroll}>
          {[
            { label: 'Scan Food', sub: 'AI Camera', icon: 'camera', color: COLORS.primary, bg: COLORS.primarySubtle, screen: 'FoodScan' },
            { label: 'AI Coach', sub: 'ChatGPT Style', icon: 'sparkles', color: COLORS.accent, bg: COLORS.accentSubtle, screen: 'AIAgentCoach' },
            { label: 'Health Twin', sub: '3D Model', icon: 'body', color: COLORS.secondary, bg: COLORS.secondarySubtle, screen: 'DigitalHealthTwin' },
            { label: 'Voice AI', sub: 'Speak Now', icon: 'mic', color: COLORS.warning, bg: COLORS.warningSubtle, screen: 'VoiceAssistant' },
            { label: 'Disease Risk', sub: 'Analysis', icon: 'shield-checkmark', color: COLORS.danger, bg: COLORS.dangerSubtle, screen: 'DiseaseRiskAnalysis' },
          ].map((action) => (
            <AnimatedPressable
              key={action.screen}
              style={[styles.actionChip, SHADOWS.sm]}
              onPress={() => onNavigate(action.screen)}
              scaleTo={0.94}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.bg }]}>
                <Ionicons name={action.icon as any} size={22} color={action.color} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
              <Text style={styles.actionSub}>{action.sub}</Text>
            </AnimatedPressable>
          ))}
        </ScrollView>

        {/* Last Scanned Meal */}
        {currentScan && (
          <>
            <Text style={styles.sectionTitle}>Last Scanned</Text>
            <AnimatedPressable onPress={() => onNavigate('FoodDetectionResult')} scaleTo={0.98}>
              <View style={[styles.mealCard, SHADOWS.sm]}>
                <Image source={{ uri: currentScan.imageUrl }} style={styles.mealImg} />
                <View style={styles.mealOverlay} />
                <View style={styles.mealContent}>
                  <View style={styles.mealTopRow}>
                    <View style={styles.mealBadge}>
                      <Text style={styles.mealBadgeText}>{currentScan.scannedAt}</Text>
                    </View>
                    <View style={styles.mealScoreBadge}>
                      <Text style={[styles.mealScoreText, { color: currentScan.healthScore > 70 ? COLORS.secondary : COLORS.warning }]}>
                        {currentScan.healthScore}/100
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.mealName}>{currentScan.name}</Text>
                  <View style={styles.mealMacros}>
                    <Text style={styles.macroPill}>{currentScan.calories} kcal</Text>
                    <Text style={styles.macroPill}>P {currentScan.proteinGrams}g</Text>
                    <Text style={styles.macroPill}>F {currentScan.fatGrams}g</Text>
                    <Text style={styles.macroPill}>C {currentScan.carbsGrams}g</Text>
                  </View>
                </View>
              </View>
            </AnimatedPressable>
          </>
        )}

        {/* Weekly Insights Dark Card */}
        <GlassCard
          variant="dark"
          icon="analytics"
          iconColor={COLORS.accentLight}
          title="Weekly Performance"
          subtitle="Health index vs last 7 days"
          badgeText="+4% 📈"
          badgeColor={COLORS.secondary}
          ctaText="Full Dashboard"
          onCtaPress={() => onNavigate('HealthDashboard')}
        >
          <View style={styles.weeklyBarsRow}>
            {[78, 82, 80, 85, 88, 84, userProfile.healthScore].map((v, i) => (
              <View key={i} style={styles.weeklyBarWrap}>
                <View style={[styles.weeklyBar, { height: Math.round((v / 100) * 48), backgroundColor: i === 6 ? COLORS.primary : 'rgba(79,110,247,0.4)' }]} />
                <Text style={styles.weeklyBarLabel}>{['M','T','W','T','F','S','T'][i]}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        <View style={{ height: 30 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  greetingBlock: {
    marginTop: 4,
    marginBottom: 16,
  },
  greetingLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  greetingTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.8,
    marginTop: 2,
  },
  greetingSub: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 3,
  },
  heroCard: {
    backgroundColor: COLORS.darkPanel,
    borderRadius: 26,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.darkStroke,
    overflow: 'hidden',
  },
  heroCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLeft: {
    flex: 1,
    marginRight: 12,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  heroBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.secondary,
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  heroScore: {
    fontSize: 52,
    fontWeight: '900',
    color: COLORS.darkText,
    letterSpacing: -2,
    lineHeight: 56,
  },
  heroScoreLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(228,231,255,0.7)',
    marginTop: 2,
  },
  heroDesc: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(228,231,255,0.55)',
    marginTop: 6,
    lineHeight: 17,
  },
  heroLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
  },
  heroLinkText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primaryLight,
  },
  ringVal: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.darkText,
    letterSpacing: -0.5,
  },
  ringLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(228,231,255,0.55)',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
    marginBottom: 10,
    marginTop: 8,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  aiAdvice: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textPrimary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  actionsScroll: {
    marginBottom: 8,
  },
  actionChip: {
    width: 112,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 20,
    padding: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(200,207,228,0.55)',
    alignItems: 'center',
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  actionSub: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  mealCard: {
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 8,
  },
  mealImg: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  mealOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(13,14,26,0.5)',
  },
  mealContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  mealTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mealBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  mealBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
  },
  mealScoreBadge: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  mealScoreText: {
    fontSize: 12,
    fontWeight: '900',
  },
  mealName: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  mealMacros: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  macroPill: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.white,
    backgroundColor: 'rgba(79,110,247,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 7,
  },
  weeklyBarsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 8,
    height: 60,
  },
  weeklyBarWrap: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  weeklyBar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  weeklyBarLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(228,231,255,0.5)',
  },
});
