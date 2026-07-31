import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { KanbanBoard } from '../components/KanbanBoard';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

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
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Animated App Bar */}
        <AnimatedAppBar
          title="Meal Planner Kanban"
          subtitle="Daily Dietary & Task Pipeline"
          showBack={Boolean(onBack)}
          onBack={onBack}
        />

        {/* Top Summary Glass Bar */}
        <View style={styles.statsRow}>
          <GlassCard variant="glass" style={styles.statCard}>
            <Text style={styles.statNumber}>{activeCount}</Text>
            <Text style={styles.statLabel}>Active Goals</Text>
          </GlassCard>

          <GlassCard variant="glass" style={styles.statCard}>
            <Text style={styles.statNumber}>{todoCount}</Text>
            <Text style={styles.statLabel}>Planned Tasks</Text>
          </GlassCard>

          <GlassCard variant="glass" style={styles.statCard}>
            <Text style={styles.statNumber}>{totalCaloriesPlanned} kcal</Text>
            <Text style={styles.statLabel}>Remaining Plan</Text>
          </GlassCard>
        </View>

        {/* Full Interactive Kanban Board */}
        <KanbanBoard
          cards={kanbanCards}
          onMoveCard={moveKanbanCard}
          onAddCard={addKanbanCard}
          onDeleteCard={deleteKanbanCard}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  statsRow: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: '700',
  },
});
