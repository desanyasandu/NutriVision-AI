import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { COLORS } from '../theme/colors';

interface VoiceAssistantScreenProps {
  onBack: () => void;
  onNavigateToAgent: () => void;
}

export const VoiceAssistantScreen: React.FC<VoiceAssistantScreenProps> = ({
  onBack,
  onNavigateToAgent,
}) => {
  const { addChatMessage } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(
    'What ingredients inside Cheese Burger trigger my Migraine or blood sugar spike?'
  );

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let animation: Animated.CompositeAnimation;
    if (isListening) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.25,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    } else {
      pulseAnim.setValue(1);
    }
    return () => {
      if (animation) animation.stop();
    };
  }, [isListening]);

  const toggleListening = () => {
    const nextState = !isListening;
    setIsListening(nextState);
    if (nextState) {
      setTimeout(() => {
        setTranscript('Recommend a low-sodium dinner bowl with high protein.');
        setIsListening(false);
      }, 3000);
    }
  };

  const submitVoiceQuery = () => {
    if (transcript) {
      addChatMessage(transcript, 'user');
      onNavigateToAgent();
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Voice Assistant" subtitle="NLP Speech Input" showBack onBack={onBack} />

      <View style={styles.content}>
        <Text style={styles.promptTitle}>Speak to NutriVision AI</Text>
        <Text style={styles.promptSub}>Ask about foods, disease risk factors, or log meals by voice.</Text>

        {/* Audio Pulse Ring Visualizer */}
        <View style={styles.pulseContainer}>
          <Animated.View
            style={[
              styles.pulseRing3,
              isListening && styles.activePulse,
              { transform: [{ scale: pulseAnim }] },
            ]}
          />
          <Animated.View
            style={[
              styles.pulseRing2,
              isListening && styles.activePulse,
              { transform: [{ scale: pulseAnim }] },
            ]}
          />
          <View style={[styles.pulseRing1, isListening && styles.activePulse]} />

          <TouchableOpacity
            style={[styles.micBtn, isListening && styles.micBtnActive]}
            onPress={toggleListening}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Toggle Microphone Recording"
          >
            <Ionicons name={isListening ? 'mic' : 'mic-outline'} size={48} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.statusLabel}>
          {isListening ? 'Listening... Speak now' : 'Tap mic to speak'}
        </Text>

        {/* Real-time Voice Transcript Box (Slide 7 Screen 9) */}
        <View style={styles.transcriptCard}>
          <View style={styles.transcriptHeader}>
            <Ionicons name="sparkles" size={16} color={COLORS.primaryLight} />
            <Text style={styles.transcriptHeaderTitle}>Speech Recognition Transcript:</Text>
          </View>
          <Text style={styles.transcriptText}>"{transcript}"</Text>
        </View>

        {/* Preset Prompt Bubbles */}
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Try asking:</Text>
          <TouchableOpacity
            style={styles.suggestionBubble}
            onPress={() => {
              setTranscript('What can I eat for dinner that won\'t trigger Migraine?');
            }}
          >
            <Text style={styles.suggestionText}>"What can I eat to prevent Migraines?"</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.suggestionBubble}
            onPress={() => {
              setTranscript('How many calories did I consume today?');
            }}
          >
            <Text style={styles.suggestionText}>"How many calories did I consume today?"</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.sendBtn} onPress={submitVoiceQuery} activeOpacity={0.85}>
        <Text style={styles.sendBtnText}>Analyze Voice Query with AI Agent</Text>
        <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  promptTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  promptSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  pulseContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  pulseRing1: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  pulseRing2: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  pulseRing3: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(16, 185, 129, 0.04)',
  },
  activePulse: {
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  micBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  micBtnActive: {
    backgroundColor: COLORS.secondary,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryLight,
    marginTop: 16,
    marginBottom: 20,
  },
  transcriptCard: {
    backgroundColor: COLORS.cardBg,
    width: '100%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 16,
  },
  transcriptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  transcriptHeaderTitle: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  transcriptText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  suggestionsContainer: {
    width: '100%',
    gap: 8,
  },
  suggestionsTitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  suggestionBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  suggestionText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  sendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
  },
  sendBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
  },
});
