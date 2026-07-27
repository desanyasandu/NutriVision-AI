import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { COLORS } from '../theme/colors';

interface AIAgentCoachScreenProps {
  onBack: () => void;
  onNavigateToTwin: () => void;
}

export const AIAgentCoachScreen: React.FC<AIAgentCoachScreenProps> = ({ onBack, onNavigateToTwin }) => {
  const { chatMessages, addChatMessage } = useApp();
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      addChatMessage(inputText.trim(), 'user');
      setInputText('');
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
        title="NutriVision AI Agent"
        subtitle="Autonomous Health & NCD Coach"
        showBack
        onBack={onBack}
        rightAction={
          <TouchableOpacity onPress={onNavigateToTwin} style={styles.headerBtn}>
            <Ionicons name="body-outline" size={22} color={COLORS.secondaryLight} />
          </TouchableOpacity>
        }
      />

      {/* Proactive Agent Context Ribbon */}
      <View style={styles.agentContextRibbon}>
        <View style={styles.agentAvatar}>
          <Ionicons name="hardware-chip-outline" size={16} color={COLORS.primary} />
        </View>
        <Text style={styles.agentContextText}>
          <Text style={styles.boldText}>Agent Active: </Text>
          Evaluating 5 NCD Risk Models • User Profile (Migraine, Pre-diabetes)
        </Text>
      </View>

      {/* Chat Messages Log */}
      <ScrollView contentContainerStyle={styles.chatList} showsVerticalScrollIndicator={false}>
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
                ]}
              >
                <Text style={[styles.messageText, isUser && styles.userMessageText]}>
                  {msg.text}
                </Text>

                {/* Recommendations Chips (Slide 7 Screen 10) */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <View style={styles.recommendationsContainer}>
                    <Text style={styles.recsTitle}>Proactive Meal Suggestions:</Text>
                    {msg.recommendations.map((rec, i) => (
                      <View key={i} style={styles.recItem}>
                        <Ionicons name="restaurant-outline" size={14} color={COLORS.primaryLight} />
                        <Text style={styles.recItemText}>{rec}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <Text style={styles.timestamp}>{msg.timestamp}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Quick Suggestions Chips */}
      <View style={styles.quickPromptsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickPrompts.map((prompt, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.promptChip}
              onPress={() => {
                addChatMessage(prompt, 'user');
              }}
            >
              <Ionicons name="flash-outline" size={12} color={COLORS.primaryLight} />
              <Text style={styles.promptChipText}>{prompt}</Text>
            </TouchableOpacity>
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

        <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.8}>
          <Ionicons name="send" size={18} color={COLORS.white} />
        </TouchableOpacity>
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
    padding: 6,
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  agentContextRibbon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.2)',
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
    fontSize: 11,
    color: COLORS.primaryLight,
    flex: 1,
  },
  boldText: {
    fontWeight: '700',
  },
  chatList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 14,
  },
  messageBubbleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    maxWidth: '86%',
  },
  userBubbleAlign: {
    alignSelf: 'flex-end',
  },
  agentBubbleAlign: {
    alignSelf: 'flex-start',
  },
  agentBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginTop: 2,
  },
  messageBubble: {
    borderRadius: 18,
    padding: 14,
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
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  userMessageText: {
    color: COLORS.white,
  },
  recommendationsContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    gap: 6,
  },
  recsTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryLight,
    marginBottom: 4,
  },
  recItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  recItemText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 6,
    textAlign: 'right',
  },
  quickPromptsRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.background,
  },
  promptChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  promptChipText: {
    fontSize: 11,
    color: COLORS.textSecondary,
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
    fontSize: 14,
    maxHeight: 100,
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
