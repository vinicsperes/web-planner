'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import HabitForm from './habit/HabitForm'
import { Notebook, Plus, SquareCheck } from 'lucide-react'

type Step = 'initial' | 'habits' | 'notes' | 'teste'

export default function MultiStepDialog() {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>('initial')

  const handleStepChange = (step: Step) => {
    setCurrentStep(step)
  }

  const renderContent = () => {
    switch (currentStep) {
      case 'initial':
        return (
          <div className="grid grid-cols-3 gap-3">
            <Button 
                className='w-full h-full flex-col p-8'
                onClick={() => handleStepChange('habits')}
            >
                <SquareCheck size={48}/>
                <h1>Habits</h1>
            </Button>
            <Button 
                className='w-full h-full flex-col p-8'
                onClick={() => handleStepChange('notes')}
            >
                <Notebook size={48}/>
                <h1>Notes</h1>
            </Button>
          </div>
        )
      case 'habits':
        return <HabitForm onBack={() => handleStepChange('initial')} />
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
                <Plus/>
                Add new habit
            </Button>
        </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] sm:max-h-[700px]">
                <DialogHeader>
                    <DialogTitle>{currentStep === 'initial' ? 'Select an option' : currentStep.charAt(0).toUpperCase() + currentStep.slice(1)}</DialogTitle>
                </DialogHeader>
                    {renderContent()}
            </DialogContent>
        </Dialog>
  )
}

