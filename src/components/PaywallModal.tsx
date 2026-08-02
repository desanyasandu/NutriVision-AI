import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { COLORS, SHADOWS } from '../theme/colors';
import { GlassCard } from './GlassCard';
import { WaterButton } from './WaterButton';
import { SuccessCheck } from './SuccessCheck';
import { AnimatedPressable } from './AnimatedPressable';
import { useApp } from '../context/AppContext';

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
  featureName?: string;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ visible, onClose, featureName }) => {
  const { subscribeToPro } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setTimeout(() => {
      subscribeToPro();
      setIsSubscribed(false);
      onClose();
    }, 1600);
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.modalCard, SHADOWS.lg]}>
          {/* Gradient Header */}
          <Svg height="140" width="100%" style={styles.headerGradient}>
            <Defs>
              <LinearGradient id="paywallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#3730A3" />
                <Stop offset="50%" stopColor="#4F46E5" />
                <Stop offset="100%" stopColor="#059669" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="140" fill="url(#paywallGrad)" />
          </Svg>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.8}>
            <Ionicons name="close" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Crown Badge */}
          <View style={styles.crownBadgeWrap}>
            <View style={styles.crownBadge}>
              <Ionicons name="king" size={28} color="#FFD700" />
            </View>
          </View>

          <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
            {isSubscribed ? (
              <View style={styles.successContainer}>
                <SuccessCheck size={64} color={COLORS.secondary} strokeWidth={4} />
                <Text style={styles.successTitle}>Welcome to NutriVision PRO! 🎉</Text>
                <Text style={styles.successSub}>All clinical AI features & 3D models are now fully unlocked.</Text>
              </View>
            ) : (
              <>
                <Text style={styles.modalTitle}>Unlock NutriVision PRO</Text>
                <Text style={styles.modalSubtitle}>
                  {featureName ? `Upgrade to PRO to access ${featureName}` : 'Clinical-Grade AI · Unlimited Scans · 3D Health Modeling'}
                </Text>

                {/* PRO Features List */}
                <View style={styles.featuresList}>
                  {[
                    { title: '3D Digital Health Twin', desc: 'Real-time organ & vascular vulnerability modeling', icon: 'cube-outline' },
                    { title: 'Disease Risk Predictor', desc: 'AI screening for Migraine, Hypertension & Diabetes', icon: 'medical-outline' },
                    { title: 'Unlimited AI Food Scans', desc: 'Multi-ingredient segmentation with 99.4% accuracy', icon: 'scan-outline' },
                    { title: '24/7 AI Health Agent Coach', desc: 'Personalized dietary intervention & instant advice', icon: 'sparkles-outline' },
                  ].map((feat, i) => (
                    <View key={i} style={styles.featRow}>
                      <View style={styles.featIconBox}>
                        <Ionicons name={feat.icon as any} size={18} color="#4F46E5" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.featTitle}>{feat.title}</Text>
                        <Text style={styles.featDesc}>{feat.desc}</Text>
                      </View>
                      <Ionicons name="checkmark-circle" size={20} color="#059669" />
                    </View>
                  ))}
                </View>

                {/* Subscription Plans */}
                <Text style={styles.planSelectTitle}>Choose Subscription Plan</Text>

                <AnimatedPressable
                  style={[styles.planCard, selectedPlan === 'annual' && styles.planCardActive]}
                  onPress={() => setSelectedPlan('annual')}
                >
                  <View style={styles.saveTag}>
                    <Text style={styles.saveTagText}>SAVE 40% · MOST POPULAR</Text>
                  </View>
                  <View style={styles.planCardInner}>
                    <View style={styles.radioCircle}>
                      {selectedPlan === 'annual' && <View style={styles.radioInner} />}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.planName}>Annual PRO Plan</Text>
                      <Text style={styles.planTrial}>7-Day Free Trial · Then $69.99/year ($5.83/mo)</Text>
                    </View>
                  </View>
                </AnimatedPressable>

                <AnimatedPressable
                  style={[styles.planCard, selectedPlan === 'monthly' && styles.planCardActive]}
                  onPress={() => setSelectedPlan('monthly')}
                >
                  <View style={styles.planCardInner}>
                    <View style={styles.radioCircle}>
                      {selectedPlan === 'monthly' && <View style={styles.radioInner} />}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.planName}>Monthly PRO Plan</Text>
                      <Text style={styles.planTrial}>$9.99/month · Billed monthly · Cancel anytime</Text>
                    </View>
                  </View>
                </AnimatedPressable>

                {/* CTA Button */}
                <WaterButton
                  title={selectedPlan === 'annual' ? "Start 7-Day Free Trial" : "Unlock PRO Monthly ($9.99)"}
                  icon="king"
                  variant="cyan"
                  size="lg"
                  onPress={handleSubscribe}
                  style={{ marginTop: 14, marginBottom: 16 }}
                />

                <Text style={styles.termsText}>
                  Cancel anytime in your App Store settings. Terms of Service & Privacy Policy apply.
                </Text>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalCard: {
    width: '100%',
    maxWidth: 480,
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crownBadgeWrap: {
    alignItems: 'center',
    marginTop: 20,
    zIndex: 2,
  },
  crownBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentScroll: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  featuresList: {
    gap: 12,
    marginBottom: 20,
  },
  featRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  featIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },
  featDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  planSelectTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#334155',
    marginBottom: 10,
  },
  planCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  planCardActive: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  },
  saveTag: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#059669',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  saveTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  planCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4F46E5',
  },
  planName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  planTrial: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  termsText: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 16,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 16,
  },
  successSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
  },
});
