import { CheckIcon, PlusIcon } from 'lucide-react';

interface ProgressButtonProps {
    onClick: () => void
    todayProgress: number
    goal: number
}

export function ProgressButton({ onClick, todayProgress, goal }: ProgressButtonProps) {
    const circleCircumference = 2 * Math.PI * 14
    const progressOffset = (circleCircumference * (goal - todayProgress)) / goal

    return (
        <button
            onClick={onClick}
            className="relative flex justify-center w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white text-lg focus:outline-none hover:bg-gray-500 z-10"
            aria-label="Mark as completed or add progress"
        >
            {/* Barra de Progresso Circular */}
            <svg className="absolute w-full h-full rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                {/* Circulo de Fundo */}
                <circle cx="18" cy="18" r="14" stroke="#d1d5db" strokeWidth="3" fill="none" />
                {/* Circulo de Progresso */}
                <circle
                    cx="18"
                    cy="18"
                    r="14"
                    stroke={todayProgress === goal ? '#10b981' : '#3b82f6'}
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={progressOffset}
                    style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                />
            </svg>
            {/* Ícone de Progresso */}
            {todayProgress === goal ? <CheckIcon /> : <PlusIcon />}
        </button>
    );
}