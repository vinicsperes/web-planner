import { Toaster } from 'sonner'
import './App.css'
import RootLayout from './app/layout'
import Home from './app/page'

function App() {
    return (
        <RootLayout>
            <Home />
            <Toaster position='bottom-right' richColors />
        </RootLayout>
    )
}

export default App
