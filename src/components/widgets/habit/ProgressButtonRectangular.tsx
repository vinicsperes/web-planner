import { CheckIcon, PlusIcon } from 'lucide-react';

interface ProgressButtonRetangularProps {
    onClick: () => void
    todayProgress: number
    goal: number
}

export function ProgressButtonRetangular({
    onClick,
    todayProgress,
    goal,
}: ProgressButtonRetangularProps) {
    const progressPercentage = (todayProgress / goal) * 100

    return (
        <div className="flex flex-col items-center w-full">
            <button
                onClick={onClick}
                className="w-full h-6 bg-gray-600 rounded-sm flex items-center justify-center text-white text-lg focus:outline-none hover:bg-gray-500"
                aria-label="Mark as completed or add progress"
            >
                {todayProgress === goal ? <CheckIcon /> : <PlusIcon />}
            </button>

            <div className="relative w-full h-1 bg-gray-400 rounded-sm mt-1">
                <div
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                    style={{
                        width: `${progressPercentage}%`,
                        transition: 'width 0.3s ease',
                    }}
                />
            </div>
        </div>
    );
}
