import { useState, useEffect } from 'react';
import { Habit } from '../utils/habitData';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);

  // Carrega hábitos do localStorage na inicialização
  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem('habits') || '[]');
    setHabits(storedHabits);
  }, []);

  // Sincroniza o estado com o localStorage
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  // Adiciona novo hábito
  function addHabit(habit: Habit) {
    setHabits((prev) => [...prev, habit]);
  }

  // Outras funções de manipulação
  function deleteHabit(habitId: string) {
    setHabits((prev) => prev.filter((habit) => habit._id !== habitId));
  }

  function editHabit(habitId: string, updatedHabit: Habit) {
    setHabits((prev) =>
      prev.map((habit) => (habit._id === habitId ? updatedHabit : habit))
    );
  }

  function checkHabit(habitId: string) {
    setHabits((prev) =>
      prev.map((habit) =>
        habit._id === habitId
          ? { ...habit, completedDates: [...habit.completedDates, new Date().toLocaleDateString()] }
          : habit
      )
    );
  }

  return { habits, addHabit, deleteHabit, editHabit, checkHabit };
}