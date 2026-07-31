import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient, Stop, Rect, Circle } from 'react-native-svg';
import { COLORS, SHADOWS } from '../theme/colors';
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
    <View style={[styles.row, isUser ? styles.userRow : styles.agentRow]}>
      {!isUser && (
        <View style={styles.avatarWrap}>
          <Svg width={34} height={34}>
            <Defs>
              <LinearGradient id="aiAvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#7B61FF" />
                <Stop offset="100%" stopColor="#4F6EF7" />
              </LinearGradient>
            </Defs>
            <Circle cx={17} cy={17} r={17} fill="url(#aiAvGrad)" />
          </Svg>
          <View style={styles.avatarIcon}>
            <Ionicons name="sparkles" size={14} color={COLORS.white} />
          </View>
        </View>
      )}

      <View style={[styles.bubble, isUser ? styles.userBubble : styles.agentBubble, SHADOWS.xs]}>
        <Text style={[styles.messageText, isUser ? styles.userText : styles.agentText]}>{text}</Text>

        {recommendations && recommendations.length > 0 && (
          <View style={styles.recsWrap}>
            <Text style={styles.recHeader}>Suggested Actions</Text>
            <View style={styles.chipRow}>
              {recommendations.map((rec, i) => (
                <AnimatedPressable
                  key={i}
                  style={styles.chip}
                  onPress={() => onSelectRecommendation?.(rec)}
                  scaleTo={0.94}
                >
                  <Ionicons name="add-circle-outline" size={13} color={COLORS.accent} />
                  <Text style={styles.chipText}>{rec}</Text>
                </AnimatedPressable>
              ))}
            </View>
          </View>
        )}

        {suggestedAction && (
          <AnimatedPressable style={styles.actionBtn} onPress={onActionPress} scaleTo={0.95}>
            <Text style={styles.actionBtnText}>{suggestedAction}</Text>
            <Ionicons name="chevron-forward" size={13} color={COLORS.white} />
          </AnimatedPressable>
        )}

        {timestamp && (
          <Text style={[styles.ts, isUser ? styles.userTs : styles.agentTs]}>{timestamp}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 7,
    paddingHorizontal: 12,
  },
  userRow: { justifyContent: 'flex-end' },
  agentRow: { justifyContent: 'flex-start' },
  avatarWrap: {
    width: 34,
    height: 34,
    marginRight: 8,
    position: 'relative',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  avatarIcon: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: 20,
    padding: 14,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 5,
  },
  agentBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(200, 207, 228, 0.7)',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },
  userText: { color: COLORS.white },
  agentText: { color: COLORS.textPrimary },
  recsWrap: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(200, 207, 228, 0.45)',
  },
  recHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accentSubtle,
    borderColor: 'rgba(123, 97, 255, 0.2)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
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
    backgroundColor: COLORS.accent,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 10,
    gap: 4,
    justifyContent: 'center',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
  },
  ts: {
    fontSize: 10,
    marginTop: 6,
    alignSelf: 'flex-end',
    fontWeight: '500',
  },
  userTs: { color: 'rgba(255,255,255,0.6)' },
  agentTs: { color: COLORS.textMuted },
});
