import "./globals.css"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-background font-sans antialiased">
                <div className="relative flex min-h-screen flex-col">
                    <main className="flex w-full flex-col overflow-hidden">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}