import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { COLORS } from '../theme/colors';

interface UserProfileScreenProps {
  onBack: () => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ onBack }) => {
  const { userProfile, setUserProfile } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [age, setAge] = useState(String(userProfile.age));
  const [weight, setWeight] = useState(String(userProfile.weightKg));
  const [height, setHeight] = useState(String(userProfile.heightCm));
  const [targetCalories, setTargetCalories] = useState(String(userProfile.dailyCalorieTarget));

  const saveProfile = () => {
    setUserProfile((prev) => ({
      ...prev,
      name,
      age: parseInt(age, 10) || prev.age,
      weightKg: parseFloat(weight) || prev.weightKg,
      heightCm: parseFloat(height) || prev.heightCm,
      dailyCalorieTarget: parseInt(targetCalories, 10) || prev.dailyCalorieTarget,
    }));
    onBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Health Profile" subtitle="User Demographic & Medical Setup" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.avatarName}>{name}</Text>
          <Text style={styles.avatarSub}>NutriVision Member • Team Dark Code</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Personal Metrics</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          </View>

          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, styles.halfInput]}>
              <Text style={styles.label}>Age (Years)</Text>
              <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
            </View>

            <View style={[styles.inputGroup, styles.halfInput]}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />
            </View>
          </View>

          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, styles.halfInput]}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput style={styles.input} value={height} onChangeText={setHeight} keyboardType="numeric" />
            </View>

            <View style={[styles.inputGroup, styles.halfInput]}>
              <Text style={styles.label}>Calorie Goal (kcal)</Text>
              <TextInput
                style={styles.input}
                value={targetCalories}
                onChangeText={setTargetCalories}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Existing Medical Conditions Setup */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Registered Pre-existing Medical Conditions</Text>
          <Text style={styles.sectionSub}>Used by Agentic AI for proactive disease warnings</Text>

          <View style={styles.conditionsPills}>
            {userProfile.existingConditions.map((cond, idx) => (
              <View key={idx} style={styles.condPill}>
                <Ionicons name="medical" size={14} color={COLORS.warning} />
                <Text style={styles.condText}>{cond}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={saveProfile} activeOpacity={0.85}>
          <Ionicons name="checkmark" size={20} color={COLORS.white} />
          <Text style={styles.saveBtnText}>Save Profile Updates</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  avatarCard: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  avatarSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 14,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: COLORS.textPrimary,
    fontSize: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  conditionsPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  condPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  condText: {
    fontSize: 12,
    color: COLORS.warning,
    fontWeight: '700',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 16,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
  },
});
