import '@/globals.css'

export const metadata = {
    title: 'Habit Tracker',
    description: 'Track your daily habits and progress',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={'font-sans bg-background'}>
            {children}
        </div>
    )
}


