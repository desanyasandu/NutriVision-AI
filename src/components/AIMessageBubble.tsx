import React from 'react';
import { View, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';
import { AnimatedPressable } from './AnimatedPressable';

interface AIMessageBubbleProps {
  sender: 'user' | 'agent';
  text: string;
  timestamp?: string;
  recommendations?: string[];
  suggestedAction?: string;
  onSelectRecommendation?: (rec: string) => void;
  onActionPress?: () => void;
}

export const AIMessageBubble: React.FC<AIMessageBubbleProps> = ({
  sender,
  text,
  timestamp,
  recommendations,
  suggestedAction,
  onSelectRecommendation,
  onActionPress,
}) => {
  const isUser = sender === 'user';

  return (
    <View style={[styles.messageRow, isUser ? styles.userRow : styles.agentRow]}>
      {!isUser && (
        <View style={styles.avatarContainer}>
          <Svg width={36} height={36}>
            <Defs>
              <LinearGradient id="aiAvatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#7C3AED" />
                <Stop offset="100%" stopColor="#3B82F6" />
              </LinearGradient>
            </Defs>
            <Circle cx={18} cy={18} r={18} fill="url(#aiAvatarGrad)" />
          </Svg>
          <View style={styles.avatarIcon}>
            <Ionicons name="sparkles" size={16} color={COLORS.white} />
          </View>
        </View>
      )}

      <View style={[styles.bubble, isUser ? styles.userBubble : styles.agentBubble, SHADOWS.sm]}>
        <Text style={[styles.messageText, isUser ? styles.userText : styles.agentText]}>{text}</Text>

        {/* Action Recommendation Chips */}
        {recommendations && recommendations.length > 0 && (
          <View style={styles.recommendationsWrapper}>
            <Text style={styles.chipHeader}>Suggested Actions:</Text>
            <View style={styles.chipGrid}>
              {recommendations.map((rec, index) => (
                <AnimatedPressable
                  key={index}
                  style={styles.chip}
                  onPress={() => onSelectRecommendation && onSelectRecommendation(rec)}
                >
                  <Ionicons name="add-circle-outline" size={14} color={COLORS.accent} />
                  <Text style={styles.chipText}>{rec}</Text>
                </AnimatedPressable>
              ))}
            </View>
          </View>
        )}

        {/* Action Button */}
        {suggestedAction && (
          <AnimatedPressable style={styles.actionBtn} onPress={onActionPress}>
            <Text style={styles.actionBtnText}>{suggestedAction}</Text>
            <Ionicons name="chevron-forward" size={14} color={COLORS.white} />
          </AnimatedPressable>
        )}

        {timestamp && (
          <Text style={[styles.timestampText, isUser ? styles.userTimestamp : styles.agentTimestamp]}>
            {timestamp}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  agentRow: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    marginRight: 10,
    position: 'relative',
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  avatarIcon: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 20,
    padding: 14,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  agentBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  agentText: {
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  recommendationsWrapper: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(241, 245, 249, 0.9)',
  },
  chipHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.accent,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    borderColor: 'rgba(124, 58, 237, 0.2)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 10,
    gap: 4,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
  },
  timestampText: {
    fontSize: 11,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  agentTimestamp: {
    color: COLORS.textMuted,
  },
});
