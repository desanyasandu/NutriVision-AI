import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KanbanCardItem } from '../data/mockData';
import { COLORS } from '../theme/colors';

interface KanbanCardProps {
  card: KanbanCardItem;
  onMove: (cardId: string, newStatus: 'todo' | 'in_progress' | 'completed') => void;
  onDelete: (cardId: string) => void;
  compact?: boolean;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  card,
  onMove,
  onDelete,
  compact = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  const getPriorityColors = (priority: KanbanCardItem['priority']) => {
    switch (priority) {
      case 'High':
        return {
          bg: 'rgba(239, 68, 68, 0.1)',
          text: COLORS.danger,
          border: 'rgba(239, 68, 68, 0.35)',
        };
      case 'Medium':
        return {
          bg: 'rgba(245, 158, 11, 0.12)',
          text: COLORS.warningDark,
          border: 'rgba(245, 158, 11, 0.35)',
        };
      case 'Low':
      default:
        return {
          bg: 'rgba(16, 185, 129, 0.12)',
          text: COLORS.success,
          border: 'rgba(16, 185, 129, 0.35)',
        };
    }
  };

  const priorityStyle = getPriorityColors(card.priority);

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.wrapper]}>
      <View style={[styles.cardContainer, { borderColor: priorityStyle.border }]}>
        {/* Top Bar: Icon, Title, Priority Tag */}
        <View style={styles.headerRow}>
          <View style={styles.iconAndCategory}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(33, 118, 255, 0.1)' }]}>
              <Ionicons name={card.icon as any || 'clipboard-outline'} size={18} color={COLORS.primary} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {card.title}
              </Text>
              <Text style={styles.categoryLabel}>{card.category}</Text>
            </View>
          </View>

          <View style={[styles.priorityBadge, { backgroundColor: priorityStyle.bg }]}>
            <Text style={[styles.priorityText, { color: priorityStyle.text }]}>
              {card.priority}
            </Text>
          </View>
        </View>

        {/* Subtitle / Description */}
        <Text style={styles.subtitleText} numberOfLines={2}>
          {card.subtitle}
        </Text>

        {/* Details Row: Calories / Targets & Related Disease Warning */}
        <View style={styles.detailsRow}>
          {card.targetValue && (
            <View style={styles.detailChip}>
              <Ionicons name="flash-outline" size={12} color={COLORS.warning} />
              <Text style={styles.detailChipText}>{card.targetValue}</Text>
            </View>
          )}

          {card.relatedDisease && (
            <View style={styles.diseaseChip}>
              <Ionicons name="pulse-outline" size={12} color={COLORS.danger} />
              <Text style={styles.diseaseChipText}>{card.relatedDisease}</Text>
            </View>
          )}

          <Text style={styles.dueDateText}>{card.dueDate}</Text>
        </View>

        {/* Action Bar / Column Navigators */}
        {!compact && (
          <View style={styles.actionRow}>
            <View style={styles.statusPills}>
              {card.status !== 'todo' && (
                <TouchableOpacity
                  style={styles.moveBtn}
                  onPress={() =>
                    onMove(
                      card.id,
                      card.status === 'completed' ? 'in_progress' : 'todo'
                    )
                  }
                  activeOpacity={0.7}
                  accessibilityLabel="Move card left"
                >
                  <Ionicons name="chevron-back" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.moveBtnText}>
                    {card.status === 'completed' ? 'To Active' : 'To Planned'}
                  </Text>
                </TouchableOpacity>
              )}

              {card.status !== 'completed' && (
                <TouchableOpacity
                  style={[styles.moveBtn, styles.moveRightBtn]}
                  onPress={() =>
                    onMove(
                      card.id,
                      card.status === 'todo' ? 'in_progress' : 'completed'
                    )
                  }
                  activeOpacity={0.7}
                  accessibilityLabel="Move card right"
                >
                  <Text style={styles.moveRightBtnText}>
                    {card.status === 'todo' ? 'Start Task' : 'Mark Done'}
                  </Text>
                  <Ionicons
                    name={card.status === 'todo' ? 'chevron-forward' : 'checkmark-circle'}
                    size={14}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => onDelete(card.id)}
              activeOpacity={0.7}
              accessibilityLabel="Delete Kanban Card"
            >
              <Ionicons name="trash-outline" size={16} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  cardContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    shadowColor: COLORS.jetBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  iconAndCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 6,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  subtitleText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  detailChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  detailChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.warningDark,
  },
  diseaseChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  diseaseChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.danger,
  },
  dueDateText: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginLeft: 'auto',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  statusPills: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  moveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: COLORS.trackBg,
  },
  moveBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  moveRightBtn: {
    backgroundColor: COLORS.primary,
  },
  moveRightBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.white,
  },
  deleteBtn: {
    padding: 6,
  },
});
