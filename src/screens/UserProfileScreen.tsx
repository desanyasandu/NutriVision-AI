import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { SecondaryButton } from '../components/SecondaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

interface UserProfileScreenProps {
  onBack: () => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ onBack }) => {
  const { userProfile } = useApp();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(true);

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Animated App Bar */}
        <AnimatedAppBar
          title="Account Profile"
          subtitle="Membership & Preferences"
          showBack
          onBack={onBack}
        />

        {/* Glass Profile Header with Large Avatar */}
        <GlassCard variant="glass" style={styles.profileHeaderCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' }}
              style={styles.largeAvatar}
            />
            <View style={styles.proBadge}>
              <Ionicons name="sparkles" size={12} color={COLORS.white} />
              <Text style={styles.proBadgeText}>PRO</Text>
            </View>
          </View>

          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userBio}>
            {userProfile.age} yrs • {userProfile.weightKg} kg • {userProfile.heightCm} cm
          </Text>

          <View style={styles.conditionsPillsRow}>
            {userProfile.existingConditions.map((cond, i) => (
              <View key={i} style={styles.condTag}>
                <Text style={styles.condTagText}>{cond}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Gold/Gradient Premium Membership Card */}
        <GlassCard variant="gradient" style={styles.membershipCard}>
          <View style={styles.memberRow}>
            <View style={styles.memberTextCol}>
              <View style={styles.goldBadge}>
                <Ionicons name="shield-checkmark" size={12} color="#D97706" />
                <Text style={styles.goldBadgeText}>CLINICAL PRO TIER</Text>
              </View>
              <Text style={styles.memberTitle}>NutriVision AI Member</Text>
              <Text style={styles.memberSub}>Unlimited Neural Food Scans & 3D Health Twin Sync</Text>
            </View>

            <View style={styles.crownBox}>
              <Ionicons name="ribbon-outline" size={32} color="#D97706" />
            </View>
          </View>
        </GlassCard>

        {/* Settings Group: Preferences */}
        <Text style={styles.sectionTitle}>Preferences & System</Text>
        <GlassCard style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBox, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                <Ionicons name="moon-outline" size={18} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingSub}>Switch theme appearance</Text>
              </View>
            </View>
            <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: '#CBD5E1', true: COLORS.primary }} />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                <Ionicons name="notifications-outline" size={18} color={COLORS.secondary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Health Alerts</Text>
                <Text style={styles.settingSub}>Real-time sodium & trigger warnings</Text>
              </View>
            </View>
            <Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: '#CBD5E1', true: COLORS.secondary }} />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBox, { backgroundColor: 'rgba(124, 58, 237, 0.1)' }]}>
                <Ionicons name="lock-closed-outline" size={18} color={COLORS.accent} />
              </View>
              <View>
                <Text style={styles.settingTitle}>HIPAA Clinical Privacy</Text>
                <Text style={styles.settingSub}>Encrypted health data storage</Text>
              </View>
            </View>
            <Switch value={privacy} onValueChange={setPrivacy} trackColor={{ false: '#CBD5E1', true: COLORS.accent }} />
          </View>
        </GlassCard>

        {/* Connected Devices */}
        <Text style={styles.sectionTitle}>Connected Devices</Text>
        <GlassCard icon="watch-outline" iconColor={COLORS.primary} title="Apple Watch Series 9" subtitle="Synced 2 mins ago • Heart Rate & SpO2">
          <View style={styles.deviceStatusRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Connected & Streaming</Text>
          </View>
        </GlassCard>

        {/* Logout Action Button */}
        <SecondaryButton
          title="Log Out of Account"
          icon="log-out-outline"
          iconColor={COLORS.danger}
          textStyle={{ color: COLORS.danger }}
          onPress={onBack}
          style={styles.logoutBtn}
        />

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
  profileHeaderCard: {
    marginVertical: 10,
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  largeAvatar: {
    width: 84,
    height: 84,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
  },
  proBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 3,
  },
  proBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  userBio: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  conditionsPillsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
  },
  condTag: {
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  condTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
  },
  membershipCard: {
    marginVertical: 8,
    padding: 18,
    borderColor: 'rgba(217, 119, 6, 0.25)',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberTextCol: {
    flex: 1,
    marginRight: 12,
  },
  goldBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 6,
  },
  goldBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#D97706',
  },
  memberTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  memberSub: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  crownBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: DESIGN_TOKENS.fontSize.sectionTitle, // 22
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    marginTop: 18,
    marginBottom: 10,
  },
  settingsCard: {
    marginVertical: 4,
    paddingVertical: 6,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(241, 245, 249, 0.9)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  settingSub: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  deviceStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(241, 245, 249, 0.9)',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
  },
  onlineText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.secondaryDark,
  },
  logoutBtn: {
    marginTop: 20,
    borderColor: 'rgba(239, 68, 68, 0.25)',
    backgroundColor: 'rgba(254, 242, 242, 0.8)',
  },
});
