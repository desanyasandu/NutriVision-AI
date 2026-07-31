import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { KanbanBoard } from '../components/KanbanBoard';
import { COLORS, SHADOWS } from '../theme/colors';

interface KanbanPlannerScreenProps {
  onBack?: () => void;
}

export const KanbanPlannerScreen: React.FC<KanbanPlannerScreenProps> = ({ onBack }) => {
  const { kanbanCards, moveKanbanCard, addKanbanCard, deleteKanbanCard } = useApp();

  const totalCaloriesPlanned = kanbanCards
    .filter((c) => c.calories && c.status !== 'completed')
    .reduce((sum, c) => sum + (c.calories || 0), 0);

  const activeCount = kanbanCards.filter((c) => c.status === 'in_progress').length;
  const todoCount = kanbanCards.filter((c) => c.status === 'todo').length;

  return (
    <View style={styles.container}>
      <Header
        title="Meal Planner Board"
        subtitle="Daily Dietary & Nutrition Pipeline"
        showBack={Boolean(onBack)}
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Summary Bar */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, SHADOWS.sm]}>
            <Text style={styles.statNumber}>{activeCount}</Text>
            <Text style={styles.statLabel}>Active Goals</Text>
          </View>

          <View style={[styles.statCard, SHADOWS.sm]}>
            <Text style={styles.statNumber}>{todoCount}</Text>
            <Text style={styles.statLabel}>Planned Tasks</Text>
          </View>

          <View style={[styles.statCard, SHADOWS.sm]}>
            <Text style={styles.statNumber}>{totalCaloriesPlanned} kcal</Text>
            <Text style={styles.statLabel}>Remaining Plan</Text>
          </View>
        </View>

        {/* Full Interactive Kanban Board */}
        <KanbanBoard
          cards={kanbanCards}
          onMoveCard={moveKanbanCard}
          onAddCard={addKanbanCard}
          onDeleteCard={deleteKanbanCard}
        />
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
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 14,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: '700',
  },
});
