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

  const onUpdateHabitProgress = (habitId: string, progress: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit._id === habitId
          ? {
            ...habit,
            // Filtra a data de hoje e adiciona o progresso para hoje
            completedDates: [
              ...habit.completedDates.filter(
                (date) => date !== new Date().toISOString().split("T")[0]
              ),
              ...Array(progress).fill(new Date().toISOString().split("T")[0]),
            ],
          }
          : habit
      )
    );
  };

  return { habits, addHabit, deleteHabit, editHabit, checkHabit, onUpdateHabitProgress };
}