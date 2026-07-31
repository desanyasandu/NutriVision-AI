import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { MedicalDisclaimerBox } from '../components/MedicalDisclaimerBox';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

interface AIAgentCoachScreenProps {
  onBack: () => void;
  onNavigateToTwin: () => void;
}

export const AIAgentCoachScreen: React.FC<AIAgentCoachScreenProps> = ({ onBack, onNavigateToTwin }) => {
  const { chatMessages, addChatMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatMessages, isTyping]);

  const handleSend = () => {
    if (inputText.trim()) {
      addChatMessage(inputText.trim(), 'user');
      setInputText('');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
  };

  const quickPrompts = [
    'What should I eat for dinner?',
    'How to lower sodium after Cheese Burger?',
    'Suggest Migraine-safe meal',
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header
        title="AI Health Companion"
        subtitle="Conversational Dietary Assistant"
        showBack
        onBack={onBack}
        rightAction={
          <AnimatedPressable onPress={onNavigateToTwin} style={styles.headerBtn}>
            <Ionicons name="body" size={20} color={COLORS.primary} />
          </AnimatedPressable>
        }
      />

      {/* Context Ribbon */}
      <View style={styles.agentContextRibbon}>
        <View style={styles.agentAvatar}>
          <Ionicons name="hardware-chip" size={14} color={COLORS.primary} />
        </View>
        <Text style={styles.agentContextText}>
          <Text style={styles.boldText}>AI Status: Active </Text> • Evaluating dietary metrics against user profile
        </Text>
      </View>

      {/* Chat Messages Log */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        <MedicalDisclaimerBox compact />

        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <View
              key={msg.id}
              style={[
                styles.messageBubbleContainer,
                isUser ? styles.userBubbleAlign : styles.agentBubbleAlign,
              ]}
            >
              {!isUser && (
                <View style={styles.agentBadge}>
                  <Ionicons name="sparkles" size={14} color={COLORS.primary} />
                </View>
              )}

              <View
                style={[
                  styles.messageBubble,
                  isUser ? styles.userBubble : styles.agentBubble,
                  SHADOWS.sm,
                ]}
              >
                <Text style={[styles.messageText, isUser && styles.userMessageText]}>
                  {msg.text}
                </Text>

                {msg.recommendations && msg.recommendations.length > 0 && (
                  <View style={styles.recommendationsContainer}>
                    <Text style={styles.recsTitle}>Suggested Meal Alternatives:</Text>
                    {msg.recommendations.map((rec, i) => (
                      <View key={i} style={styles.recItem}>
                        <Ionicons name="restaurant" size={13} color={COLORS.primary} />
                        <Text style={styles.recItemText}>{rec}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <Text style={[styles.timestamp, isUser && styles.userTimestamp]}>{msg.timestamp}</Text>
              </View>
            </View>
          );
        })}

        {isTyping && (
          <View style={[styles.messageBubbleContainer, styles.agentBubbleAlign]}>
            <View style={styles.agentBadge}>
              <Ionicons name="sparkles" size={14} color={COLORS.primary} />
            </View>
            <View style={[styles.messageBubble, styles.agentBubble, SHADOWS.sm]}>
              <Text style={styles.typingText}>NutriVision AI is evaluating response...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick Suggestions Chips */}
      <View style={styles.quickPromptsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickPrompts.map((prompt, idx) => (
            <AnimatedPressable
              key={idx}
              style={styles.promptChip}
              onPress={() => {
                addChatMessage(prompt, 'user');
                setIsTyping(true);
                setTimeout(() => setIsTyping(false), 1000);
              }}
            >
              <Ionicons name="flash" size={12} color={COLORS.primary} />
              <Text style={styles.promptChipText}>{prompt}</Text>
            </AnimatedPressable>
          ))}
        </ScrollView>
      </View>

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask NutriVision AI about your food or health..."
          placeholderTextColor={COLORS.textMuted}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
        />

        <AnimatedPressable style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={18} color={COLORS.white} />
        </AnimatedPressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  agentContextRibbon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(33, 118, 255, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(33, 118, 255, 0.15)',
  },
  agentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentContextText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    flex: 1,
    fontWeight: '500',
  },
  boldText: {
    fontWeight: '900',
    color: COLORS.primary,
  },
  chatList: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  messageBubbleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    maxWidth: '88%',
  },
  userBubbleAlign: {
    alignSelf: 'flex-end',
  },
  agentBubbleAlign: {
    alignSelf: 'flex-start',
  },
  agentBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginTop: 2,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 16,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  agentBubble: {
    backgroundColor: COLORS.cardBg,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  messageText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  userMessageText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  typingText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  recommendationsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    gap: 8,
  },
  recsTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 4,
  },
  recItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(33, 118, 255, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  recItemText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  timestamp: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 6,
    textAlign: 'right',
    fontWeight: '500',
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  quickPromptsRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
  },
  promptChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    minHeight: 46,
  },
  promptChipText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.cardBg,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: COLORS.textPrimary,
    fontSize: 15,
    maxHeight: 100,
    minHeight: 46,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
