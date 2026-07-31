import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { AIMessageBubble } from '../components/AIMessageBubble';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

interface AIAgentCoachScreenProps {
  onBack: () => void;
  onNavigateToTwin: () => void;
}

const SUGGESTED_PROMPTS = [
  'What should I eat for dinner?',
  'Is cheese burger good for migraine?',
  'How to lower sodium intake today?',
  'Recommend low sugar snacks',
];

export const AIAgentCoachScreen: React.FC<AIAgentCoachScreenProps> = ({
  onBack,
  onNavigateToTwin,
}) => {
  const { chatMessages, addChatMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const msg = textToSend || inputText;
    if (!msg.trim()) return;

    addChatMessage(msg, 'user');
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  return (
    <LayeredBackground style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Animated App Bar with ChatGPT style Title & Twin shortcut */}
        <AnimatedAppBar
          title="NutriVision AI"
          subtitle="ChatGPT Clinical Dietary Assistant"
          showBack
          onBack={onBack}
          rightActionIcon="body-outline"
          onRightAction={onNavigateToTwin}
        />

        {/* Pinned Clinical Recommendation Banner */}
        <View style={styles.pinnedBanner}>
          <View style={styles.pinnedBadge}>
            <Ionicons name="pin" size={12} color={COLORS.white} />
            <Text style={styles.pinnedBadgeText}>PINNED CONTEXT</Text>
          </View>
          <Text style={styles.pinnedText} numberOfLines={1}>
            Pre-diabetes (Gluc: 62%) • Migraine Vascular Alert • Sodium Limit 2000mg
          </Text>
        </View>

        {/* Messages List Container */}
        <ScrollView contentContainerStyle={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {chatMessages.map((msg) => (
            <AIMessageBubble
              key={msg.id}
              sender={msg.sender}
              text={msg.text}
              timestamp={msg.timestamp}
              recommendations={msg.recommendations}
              suggestedAction={msg.suggestedAction}
              onSelectRecommendation={(rec) => handleSend(`Tell me more about ${rec}`)}
              onActionPress={onNavigateToTwin}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={styles.typingContainer}>
              <View style={styles.typingBubble}>
                <Ionicons name="sparkles" size={14} color={COLORS.accent} />
                <Text style={styles.typingText}>NutriVision AI is thinking...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Suggested Quick Prompt Chips */}
        <View style={styles.promptsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promptsScroll}>
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <AnimatedPressable
                key={idx}
                style={styles.promptChip}
                onPress={() => handleSend(prompt)}
              >
                <Ionicons name="sparkles-outline" size={12} color={COLORS.accent} />
                <Text style={styles.promptChipText}>{prompt}</Text>
              </AnimatedPressable>
            ))}
          </ScrollView>
        </View>

        {/* Modern ChatGPT Composer Input Bar */}
        <View style={styles.composerWrapper}>
          <View style={[styles.composerContainer, SHADOWS.sm]}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask AI about food, macros, or disease risks..."
              placeholderTextColor={COLORS.textMuted}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => handleSend()}
            />

            <AnimatedPressable
              style={[styles.sendBtn, inputText.trim() ? styles.sendBtnActive : styles.sendBtnInactive]}
              onPress={() => handleSend()}
              disabled={!inputText.trim()}
            >
              <Ionicons name="arrow-up" size={18} color={COLORS.white} />
            </AnimatedPressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  pinnedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(124, 58, 237, 0.15)',
    gap: 8,
  },
  pinnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  pinnedBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.white,
  },
  pinnedText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.accent,
    flex: 1,
  },
  messagesContainer: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  typingContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  typingText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.accent,
  },
  promptsWrapper: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  promptsScroll: {
    flexDirection: 'row',
  },
  promptChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    marginRight: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  promptChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  composerWrapper: {
    paddingHorizontal: 12,
    paddingBottom: 16,
    paddingTop: 4,
  },
  composerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: DESIGN_TOKENS.borderRadius.input, // 18
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  textInput: {
    flex: 1,
    height: 44,
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: COLORS.accent,
  },
  sendBtnInactive: {
    backgroundColor: 'rgba(148, 163, 184, 0.4)',
  },
});
