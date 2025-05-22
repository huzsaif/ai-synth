import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
