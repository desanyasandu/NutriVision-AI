import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

interface MedicalDisclaimerBoxProps {
  compact?: boolean;
}

export const MedicalDisclaimerBox: React.FC<MedicalDisclaimerBoxProps> = ({ compact = false }) => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  return (
    <View style={[styles.container, compact && styles.containerCompact]}>
      <View style={styles.headerRow}>
        <Ionicons name="shield-checkmark" size={18} color={COLORS.primary} />
        <Text style={styles.title}>Clinical Advisory & Limitation Notice</Text>
      </View>

      <Text style={styles.text}>
        NutriVision AI provides statistical nutrition and risk forecasts for educational reference only. Estimates carry a ±4% model variation margin and do NOT constitute a medical diagnosis. Always consult a qualified health professional.
      </Text>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.helplineBtn}
          onPress={() => setShowEmergencyModal(true)}
          accessibilityRole="button"
          accessibilityLabel="Contact Doctor or Emergency Helpline"
        >
          <Ionicons name="call-outline" size={14} color={COLORS.secondary} />
          <Text style={styles.helplineText}>Physician & Helpline Info</Text>
        </TouchableOpacity>
      </View>

      {/* Emergency & Doctor Contact Modal */}
      <Modal visible={showEmergencyModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Ionicons name="medical" size={24} color={COLORS.danger} />
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

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowEmergencyModal(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 20,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  containerCompact: {
    padding: 10,
    marginHorizontal: 0,
    marginTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.jetBlack,
  },
  text: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  actionRow: {
    marginTop: 10,
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
    minHeight: 44,
  },
  helplineText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.jetBlack,
  },
  modalBody: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  contactItem: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
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
    marginTop: 2,
  },
  modalCloseBtn: {
    backgroundColor: COLORS.jetBlack,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    minHeight: 44,
    justifyContent: 'center',
  },
  modalCloseText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
});
