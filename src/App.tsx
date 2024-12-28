import './App.css'
import RootLayout from './app/layout'
import Home from './app/pages/Home'
import { Toaster } from './components/ui/sonner'

function App() {
    return (
        <RootLayout>
            <Home />
            <Toaster position='bottom-right' richColors />
        </RootLayout>
    )
}

export default App
