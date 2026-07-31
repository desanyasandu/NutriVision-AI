import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
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
  const doneCount = kanbanCards.filter((c) => c.status === 'completed').length;

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AnimatedAppBar
          title="Meal Planner"
          subtitle="Daily dietary task pipeline"
          showBack={Boolean(onBack)}
          onBack={onBack}
          rightActionIcon="add"
          onRightAction={() => addKanbanCard?.({ title: 'New Meal', status: 'todo' } as any)}
        />

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { label: 'Todo', val: todoCount, icon: 'ellipse-outline' as const, color: COLORS.primary },
            { label: 'Active', val: activeCount, icon: 'time' as const, color: COLORS.warning },
            { label: 'Done', val: doneCount, icon: 'checkmark-circle' as const, color: COLORS.secondary },
            { label: 'Planned kcal', val: totalCaloriesPlanned, icon: 'flame' as const, color: COLORS.accent },
          ].map((s) => (
            <View key={s.label} style={[styles.statCard, SHADOWS.xs]}>
              <Ionicons name={s.icon} size={16} color={s.color} />
              <Text style={[styles.statNumber, { color: s.color }]}>{s.val}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Today's AI Meal Suggestion */}
        <GlassCard
          variant="gradient"
          icon="sparkles"
          iconColor={COLORS.accent}
          iconBg={COLORS.accentSubtle}
          title="AI Meal Suggestion"
          subtitle="Optimized for today's risk profile"
          compact
        >
          <Text style={styles.aiSuggestion}>
            Based on your migraine risk (55%) and pre-diabetes status, dinner should include: grilled salmon, steamed broccoli, and brown rice. No aged cheese or high-sodium sauces.
          </Text>
        </GlassCard>

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
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(200,207,228,0.55)',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '700',
    textAlign: 'center',
  },
  aiSuggestion: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textPrimary,
    lineHeight: 19,
    fontStyle: 'italic',
  },
});
