import { Heatmap } from '@/components/Heatmap';
import { HabitList } from '@/components/HabitList';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MultiStepDialog from '@/components/MultiStepDialog';
import { useHabits } from '@/hooks/useHabits';
import { Habit } from '@/utils/habitData';

export default function Home() {
  const { habits, addHabit, onUpdateHabitProgress } = useHabits();

  const handleAddHabit = (newHabit: Habit) => {
    addHabit(newHabit);
  };

  const handleUpdateProgress = (habitId: string, progress: number) => {
    onUpdateHabitProgress(habitId, progress);
  };

  return (
    <div className="container mx-2 p-4">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold mb-6">web-planner</h1>
        <MultiStepDialog onAddHabit={handleAddHabit} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Heatmap habits={habits} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Today's Habits</CardTitle>
          </CardHeader>
          <CardContent>
            <HabitList habits={habits} onUpdateHabitProgress={handleUpdateProgress} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
