import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import RootLayout from './app/layout';
import Home from './app/page';
import FinancialDashboard from './components/financialDashboard/FinancialDashboard';

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/finances" element={<FinancialDashboard />} />
        </Routes>

        <Toaster position="bottom-right" richColors />
      </RootLayout>
    </Router>
  );
}

export default App;
