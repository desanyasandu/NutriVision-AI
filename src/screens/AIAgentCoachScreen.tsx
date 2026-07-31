import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { AIMessageBubble } from '../components/AIMessageBubble';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

interface AIAgentCoachScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const STARTER_PROMPTS = [
  { icon: 'nutrition', text: 'What should I eat for dinner?', color: COLORS.secondary },
  { icon: 'shield-checkmark', text: 'Analyze my migraine risk today', color: COLORS.danger },
  { icon: 'fitness', text: 'Best workout for my condition', color: COLORS.primary },
  { icon: 'moon', text: 'Optimize my sleep schedule', color: COLORS.accent },
];

export const AIAgentCoachScreen: React.FC<AIAgentCoachScreenProps> = ({ onBack, onNavigate }) => {
  const { chatHistory, sendChatMessage } = useApp();
  const chatMessages = chatHistory as Array<{ sender: string; text: string; timestamp: string; recommendations?: string[] }>;
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setLoading(true);
    await sendChatMessage(msg);
    setLoading(false);
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const hasMessages = chatMessages && chatMessages.length > 0;

  return (
    <LayeredBackground>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={80}>
        <AnimatedAppBar
          title="NutriVision AI"
          subtitle="Medical-grade health coaching"
          showBack
          onBack={onBack}
          rightActionIcon="mic"
          onRightAction={() => onNavigate('VoiceAssistant')}
        />

        {/* Agent Header Card */}
        <View style={[styles.agentCard, SHADOWS.md]}>
          <View style={styles.agentAvatarWrap}>
            <View style={styles.agentAvatar}>
              <Ionicons name="sparkles" size={22} color={COLORS.white} />
            </View>
            <View style={styles.agentAvatarDot} />
          </View>
          <View style={styles.agentMeta}>
            <Text style={styles.agentName}>NutriVision Clinical AI</Text>
            <Text style={styles.agentRole}>Pre-Diabetes · Migraine · Nutrition Coach</Text>
            <View style={styles.agentBadgeRow}>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Online</Text>
              </View>
              <Text style={styles.capLabel}>GPT-4o · Medical Mode</Text>
            </View>
          </View>
        </View>

        {/* Chat Area */}
        <ScrollView
          ref={scrollRef}
          style={styles.chatScroll}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {!hasMessages && (
            <View style={styles.emptyState}>
              <View style={[styles.emptyOrb, SHADOWS.glowAccent]}>
                <Ionicons name="sparkles" size={36} color={COLORS.white} />
              </View>
              <Text style={styles.emptyTitle}>How can I help you?</Text>
              <Text style={styles.emptySub}>Ask anything about nutrition, disease prevention, vitals, or meal planning</Text>

              <View style={styles.startersGrid}>
                {STARTER_PROMPTS.map((p, i) => (
                  <AnimatedPressable key={i} style={[styles.starterBtn, SHADOWS.sm]} onPress={() => handleSend(p.text)} scaleTo={0.95}>
                    <View style={[styles.starterIcon, { backgroundColor: p.color + '15' }]}>
                      <Ionicons name={p.icon as any} size={18} color={p.color} />
                    </View>
                    <Text style={styles.starterText}>{p.text}</Text>
                  </AnimatedPressable>
                ))}
              </View>
            </View>
          )}

          {chatMessages?.map((msg, i) => (
            <AIMessageBubble
              key={i}
              sender={msg.sender === 'user' ? 'user' : 'agent'}
              text={msg.text}
              timestamp={msg.timestamp}
              recommendations={msg.sender === 'agent' ? msg.recommendations : undefined}
              onSelectRecommendation={(r) => handleSend(r)}
            />
          ))}

          {loading && (
            <View style={styles.loadingRow}>
              <View style={styles.loadingBubble}>
                <View style={styles.thinkingDots}>
                  {[0, 1, 2].map((i) => (
                    <View key={i} style={[styles.dot, { opacity: 0.4 + i * 0.2 }]} />
                  ))}
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputWrapper}>
          <View style={[styles.inputBar, SHADOWS.glass]}>
            <AnimatedPressable style={styles.attachBtn} scaleTo={0.9}>
              <Ionicons name="add" size={20} color={COLORS.textMuted} />
            </AnimatedPressable>

            <TextInput
              style={styles.textInput}
              value={input}
              onChangeText={setInput}
              placeholder="Ask NutriVision AI..."
              placeholderTextColor={COLORS.textMuted}
              multiline
              maxLength={500}
              onSubmitEditing={() => handleSend()}
              returnKeyType="send"
            />

            <AnimatedPressable
              style={[styles.sendBtn, { backgroundColor: input.trim() ? COLORS.primary : COLORS.trackBg }]}
              onPress={() => handleSend()}
              disabled={!input.trim() && !loading}
              scaleTo={0.88}
            >
              <Ionicons name="arrow-up" size={18} color={input.trim() ? COLORS.white : COLORS.textMuted} />
            </AnimatedPressable>
          </View>
          <Text style={styles.inputHint}>Medical AI · Not a clinical substitute</Text>
        </View>
      </KeyboardAvoidingView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.darkPanel,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.darkStroke,
    gap: 12,
  },
  agentAvatarWrap: { position: 'relative' },
  agentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.glowAccent,
  },
  agentAvatarDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: COLORS.darkPanel,
  },
  agentMeta: { flex: 1 },
  agentName: { fontSize: 15, fontWeight: '900', color: COLORS.darkText },
  agentRole: { fontSize: 11, fontWeight: '600', color: 'rgba(228,231,255,0.6)', marginTop: 2 },
  agentBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,196,140,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  statusDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: COLORS.secondary },
  statusText: { fontSize: 10, fontWeight: '700', color: COLORS.secondary },
  capLabel: { fontSize: 10, fontWeight: '600', color: 'rgba(228,231,255,0.4)' },
  chatScroll: { flex: 1 },
  chatContent: { paddingBottom: 16 },
  emptyState: { alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 },
  emptyOrb: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: { fontSize: 26, fontWeight: '900', color: COLORS.textPrimary, letterSpacing: -0.5 },
  emptySub: { fontSize: 13, fontWeight: '500', color: COLORS.textSecondary, textAlign: 'center', marginTop: 6, lineHeight: 20 },
  startersGrid: { width: '100%', gap: 8, marginTop: 20 },
  starterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(200,207,228,0.6)',
    gap: 10,
  },
  starterIcon: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  starterText: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary, flex: 1 },
  loadingRow: { paddingHorizontal: 12, alignItems: 'flex-start', marginVertical: 4 },
  loadingBubble: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 18,
    borderBottomLeftRadius: 5,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(200,207,228,0.55)',
  },
  thinkingDots: { flexDirection: 'row', gap: 5, alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.accent },
  inputWrapper: { paddingHorizontal: 16, paddingBottom: Platform.OS === 'ios' ? 28 : 14, paddingTop: 6 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 22,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(200,207,228,0.7)',
    gap: 8,
  },
  attachBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: COLORS.trackBg },
  textInput: { flex: 1, fontSize: 14, fontWeight: '500', color: COLORS.textPrimary, maxHeight: 90, paddingVertical: 6 },
  sendBtn: { width: 36, height: 36, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  inputHint: { fontSize: 10, fontWeight: '500', color: COLORS.textMuted, textAlign: 'center', marginTop: 5 },
});
