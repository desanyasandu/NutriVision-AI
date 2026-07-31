import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedPressable } from './AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

interface MedicalDisclaimerBoxProps {
  compact?: boolean;
}

export const MedicalDisclaimerBox: React.FC<MedicalDisclaimerBoxProps> = ({ compact = false }) => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  return (
    <View style={[styles.container, compact && styles.containerCompact]}>
      <View style={styles.headerRow}>
        <View style={styles.iconBox}>
          <Ionicons name="shield-checkmark" size={16} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>Clinical Advisory & Limitation Notice</Text>
      </View>

      <Text style={styles.text}>
        NutriVision AI provides statistical nutrition and risk forecasts for educational reference only. Estimates carry a ±4% model variation margin and do NOT constitute a medical diagnosis. Always consult a qualified health professional.
      </Text>

      <View style={styles.actionRow}>
        <AnimatedPressable
          style={styles.helplineBtn}
          onPress={() => setShowEmergencyModal(true)}
        >
          <Ionicons name="call-outline" size={14} color={COLORS.secondaryDark} />
          <Text style={styles.helplineText}>Physician & Helpline Info</Text>
        </AnimatedPressable>
      </View>

      {/* Emergency & Doctor Contact Modal */}
      <Modal visible={showEmergencyModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.dangerIconBox}>
                <Ionicons name="medical" size={22} color={COLORS.danger} />
              </View>
              <Text style={styles.modalTitle}>Medical & Emergency Contacts</Text>
            </View>

            <Text style={styles.modalBody}>
              If you are experiencing severe symptoms, chest pain, or allergic reactions, please seek immediate emergency care:
            </Text>

            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>National Emergency Health Hotline:</Text>
              <Text style={styles.contactValue}>1990 (Suwa Seriya Helpline)</Text>
            </View>

            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Clinical Telemedicine Advisory:</Text>
              <Text style={styles.contactValue}>+94 11 269 1111</Text>
            </View>

            <AnimatedPressable
              style={styles.modalCloseBtn}
              onPress={() => setShowEmergencyModal(false)}
            >
              <Text style={styles.modalCloseText}>Close Advisory</Text>
            </AnimatedPressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.sm,
  },
  containerCompact: {
    padding: 12,
    marginHorizontal: 0,
    marginTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(33, 118, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  text: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 17,
  },
  actionRow: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  helplineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(247, 152, 36, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(247, 152, 36, 0.3)',
    minHeight: 40,
  },
  helplineText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondaryDark,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 22,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.glow,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  dangerIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  modalBody: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 16,
  },
  contactItem: {
    backgroundColor: COLORS.background,
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  contactLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 3,
  },
  modalCloseBtn: {
    backgroundColor: COLORS.jetBlack,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    minHeight: 44,
    justifyContent: 'center',
  },
  modalCloseText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 14,
  },
});
