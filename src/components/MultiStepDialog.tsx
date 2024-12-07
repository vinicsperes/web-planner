'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import HabitForm from './habit/HabitForm'
import { ChevronLeft, Notebook, Plus, SquareCheck } from 'lucide-react'

type Step = 'initial' | 'habits' | 'notes' | 'teste'

export default function MultiStepDialog() {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>('initial')

  const handleStepChange = (step: Step) => {
    setCurrentStep(step)
  }
  console.log('currentStep: ' + currentStep)
  const renderContent = () => {
    switch (currentStep) {
      case 'initial':
        return (
          <div className="grid grid-cols-3 gap-3">
            <Button
              className='w-full h-full flex-col p-8'
              onClick={() => handleStepChange('habits')}
            >
              <SquareCheck size={48} />
              <h1>Habits</h1>
            </Button>
            <Button
              className='w-full h-full flex-col p-8'
              onClick={() => handleStepChange('notes')}
            >
              <Notebook size={48} />
              <h1>Notes</h1>
            </Button>
          </div>
        )
      case 'habits':
        return <HabitForm />
      case 'notes':
        return <div>Notes content (to be implemented)</div>
      case 'teste':
        return <div>Teste content (to be implemented)</div>
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add new habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {currentStep !== 'initial' && (
              <Button
                type="button"
                variant="default"
                className="p-1 rounded-5"
                onClick={() => handleStepChange('initial')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <span className="text-lg font-semibold">
              {currentStep === 'initial' ? 'Select an option' : currentStep.charAt(0).toUpperCase() + currentStep.slice(1)}
            </span>
          </DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}

