import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KanbanCardItem } from '../data/mockData';
import { KanbanCard } from './KanbanCard';
import { COLORS } from '../theme/colors';

interface KanbanBoardProps {
  cards: KanbanCardItem[];
  onMoveCard: (cardId: string, newStatus: 'todo' | 'in_progress' | 'completed') => void;
  onAddCard: (card: Omit<KanbanCardItem, 'id'>) => void;
  onDeleteCard: (cardId: string) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  cards,
  onMoveCard,
  onAddCard,
  onDeleteCard,
}) => {
  const [activeTab, setActiveTab] = useState<'todo' | 'in_progress' | 'completed'>('in_progress');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Card Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<KanbanCardItem['category']>('Meal Plan');
  const [newPriority, setNewPriority] = useState<KanbanCardItem['priority']>('Medium');
  const [newTargetValue, setNewTargetValue] = useState('');
  const [newRelatedDisease, setNewRelatedDisease] = useState('');

  const categories = ['All', 'Meal Plan', 'Hydration', 'Risk Mitigation', 'Exercise', 'Supplement'];

  // Filter cards by category
  const filteredCards = cards.filter((c) => {
    if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
    return true;
  });

  const todoCards = filteredCards.filter((c) => c.status === 'todo');
  const inProgressCards = filteredCards.filter((c) => c.status === 'in_progress');
  const completedCards = filteredCards.filter((c) => c.status === 'completed');

  const totalCount = cards.length;
  const completedCount = cards.filter((c) => c.status === 'completed').length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleCreateTask = () => {
    if (!newTitle.trim()) return;

    onAddCard({
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Custom health action item',
      category: newCategory,
      status: 'todo',
      priority: newPriority,
      targetValue: newTargetValue.trim() || undefined,
      relatedDisease: newRelatedDisease.trim() || undefined,
      icon:
        newCategory === 'Meal Plan'
          ? 'restaurant'
          : newCategory === 'Hydration'
          ? 'water'
          : newCategory === 'Exercise'
          ? 'walk'
          : newCategory === 'Risk Mitigation'
          ? 'warning'
          : 'medical',
      tags: [newCategory, newPriority],
      dueDate: 'Today',
    });

    // Reset Form
    setNewTitle('');
    setNewSubtitle('');
    setNewCategory('Meal Plan');
    setNewPriority('Medium');
    setNewTargetValue('');
    setNewRelatedDisease('');
    setIsModalOpen(false);
  };

  const getTabCards = () => {
    switch (activeTab) {
      case 'todo':
        return todoCards;
      case 'in_progress':
        return inProgressCards;
      case 'completed':
        return completedCards;
      default:
        return inProgressCards;
    }
  };

  const currentTabCards = getTabCards();

  return (
    <View style={styles.container}>
      {/* Board Summary Progress Bar */}
      <View style={styles.progressHeaderCard}>
        <View style={styles.progressHeaderRow}>
          <View>
            <Text style={styles.progressTitle}>Daily Meal Plan</Text>
            <Text style={styles.progressSub}>
              {completedCount} of {totalCount} goals completed ({completionPercentage}%)
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addTaskBtn}
            onPress={() => setIsModalOpen(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={18} color={COLORS.white} />
            <Text style={styles.addTaskBtnText}>Add Card</Text>
          </TouchableOpacity>
        </View>

        {/* Progress bar track */}
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: `${completionPercentage}%` }]} />
        </View>
      </View>

      {/* Category Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.7}
            >
              <Text style={[styles.categoryChipText, isSelected && styles.categoryChipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Column Switcher Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'todo' && styles.tabBtnActive]}
          onPress={() => setActiveTab('todo')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'todo' && styles.tabBtnTextActive]}>
            📋 Planned ({todoCards.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'in_progress' && styles.tabBtnActive]}
          onPress={() => setActiveTab('in_progress')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'in_progress' && styles.tabBtnTextActive]}>
            ⚡ Active ({inProgressCards.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'completed' && styles.tabBtnActive]}
          onPress={() => setActiveTab('completed')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'completed' && styles.tabBtnTextActive]}>
            ✅ Done ({completedCards.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card List Container */}
      <View style={styles.cardListContainer}>
        {currentTabCards.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="documents-outline" size={40} color={COLORS.textMuted} />
            <Text style={styles.emptyTitle}>No cards in this column</Text>
            <Text style={styles.emptySub}>
              {selectedCategory !== 'All'
                ? `No ${selectedCategory} cards found.`
                : 'Tap "Add Card" to create a new dietary or health task.'}
            </Text>
          </View>
        ) : (
          currentTabCards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              onMove={onMoveCard}
              onDelete={onDeleteCard}
            />
          ))
        )}
      </View>

      {/* Add Kanban Task Modal */}
      <Modal visible={isModalOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Meal Plan Goal</Text>
              <TouchableOpacity onPress={() => setIsModalOpen(false)}>
                <Ionicons name="close-circle-outline" size={24} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Task Title *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Low Sodium Salmon Bowl"
                placeholderTextColor={COLORS.textMuted}
                value={newTitle}
                onChangeText={setNewTitle}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Subtitle / Goal Description</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Zero refined sugar, high protein"
                placeholderTextColor={COLORS.textMuted}
                value={newSubtitle}
                onChangeText={setNewSubtitle}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {['Meal Plan', 'Hydration', 'Risk Mitigation', 'Exercise', 'Supplement'].map(
                  (c) => (
                    <TouchableOpacity
                      key={c}
                      style={[
                        styles.chipOption,
                        newCategory === c && styles.chipOptionSelected,
                      ]}
                      onPress={() => setNewCategory(c as any)}
                    >
                      <Text
                        style={[
                          styles.chipOptionText,
                          newCategory === c && styles.chipOptionTextSelected,
                        ]}
                      >
                        {c}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </ScrollView>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Priority Level</Text>
              <View style={styles.rowGroup}>
                {(['High', 'Medium', 'Low'] as const).map((p) => (
                  <TouchableOpacity
                    key={p}
                    style={[
                      styles.chipOption,
                      newPriority === p && styles.chipOptionSelected,
                    ]}
                    onPress={() => setNewPriority(p)}
                  >
                    <Text
                      style={[
                        styles.chipOptionText,
                        newPriority === p && styles.chipOptionTextSelected,
                      ]}
                    >
                      {p}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Target Value / Calories (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 500 kcal or 2.5 L"
                placeholderTextColor={COLORS.textMuted}
                value={newTargetValue}
                onChangeText={setNewTargetValue}
              />
            </View>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleCreateTask}
              activeOpacity={0.85}
            >
              <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.white} />
              <Text style={styles.submitBtnText}>Create Goal Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressHeaderCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  progressSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  addTaskBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
  },
  addTaskBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
  },
  barBg: {
    height: 8,
    backgroundColor: COLORS.trackBg,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  categoryChipTextActive: {
    color: COLORS.white,
    fontWeight: '800',
  },
  tabsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: COLORS.trackBg,
    borderRadius: 14,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: COLORS.cardBg,
    shadowColor: COLORS.jetBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  tabBtnTextActive: {
    color: COLORS.primary,
    fontWeight: '900',
  },
  cardListContainer: {
    paddingHorizontal: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 10,
  },
  emptySub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    gap: 14,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  formGroup: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    color: COLORS.textPrimary,
    fontSize: 13,
  },
  rowGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  chipOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginRight: 6,
  },
  chipOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipOptionText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  chipOptionTextSelected: {
    color: COLORS.white,
    fontWeight: '800',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 8,
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
  },
});
