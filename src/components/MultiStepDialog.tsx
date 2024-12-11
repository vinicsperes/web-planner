'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import HabitForm from './habit/HabitForm'
import { ChevronLeft, Notebook, Plus, SquareCheck, Type, BookImage } from 'lucide-react'
import { Habit } from '@/utils/habitData'

type Step = 'initial' | 'habits' | 'notes' | 'teste' | 'header' | 'image'

const steps: { name: Step, label: string, icon: JSX.Element | null }[] = [
  { name: 'habits', label: 'Habits', icon: <SquareCheck size={48} /> },
  { name: 'notes', label: 'Notes', icon: <Notebook size={48} /> },
  { name: 'header', label: 'Header', icon: <Type size={48} /> },
  { name: 'image', label: 'Image', icon: <BookImage size={48} /> },
]
type MultiStepDialogProps = {
  onAddHabit: (habit: Habit) => void;
};

export default function MultiStepDialog({ onAddHabit }: MultiStepDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('initial');

  const handleStepChange = (step: Step) => {
    setCurrentStep(step);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus />
          <span>Add new habit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] sm:max-h-[900px] border-zinc-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {currentStep !== 'initial' && (
              <Button
                type="button"
                variant="ghost"
                className="p-1 rounded-5"
                onClick={() => setCurrentStep('initial')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <span className="text-lg font-semibold">
              {currentStep === 'initial' ? 'Select an option' : currentStep.charAt(0).toUpperCase() + currentStep.slice(1)}
            </span>
          </DialogTitle>
        </DialogHeader>

        {currentStep === 'initial' ? (
          <div className="grid grid-cols-3 gap-3">
            {steps.map((step) => (
              <Button
                key={step.name}
                className="w-full h-full flex-col p-8"
                onClick={() => handleStepChange(step.name)}
              >
                {step.icon}
                <h1>{step.label}</h1>
              </Button>
            ))}
          </div>
        ) : currentStep === 'habits' ? (
          <HabitForm closeDialog={closeDialog} onAddHabit={onAddHabit} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
