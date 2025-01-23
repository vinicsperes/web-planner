import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import RootLayout from './app/layout';
import Home from './app/page';
import FinancialDashboard from './components/financialDashboard/FinancialDashboard';
import HabitDashboard from './components/habitDashboard/HabitDashboard';
import TodoDashboard from './components/todoDashboard/TodoDashboard';
import WorkoutDashboard from './components/workoutDashboard/WorkoutDashboard';

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/finances" element={<FinancialDashboard />} />
          <Route path="/workout" element={<WorkoutDashboard />} />
          <Route path="/todos" element={<TodoDashboard />} />
          <Route path="/habits" element={<HabitDashboard />} />
        </Routes>

        <Toaster position="bottom-right" richColors />
      </RootLayout>
    </Router>
  );
}

export default App;
