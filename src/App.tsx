import './App.css'
import RootLayout from './app/layout'
import Home from './app/page'
import { Toaster } from './app/components/ui/sonner'

function App() {
    return (
        <RootLayout>
            <Home />
            <Toaster position='bottom-right' richColors />
        </RootLayout>
    )
}

export default App
