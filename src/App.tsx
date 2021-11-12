import { Home } from './pages/Home';
import { DataContextProvider } from './contexts/DataContext';

function App() {
  return (
    <DataContextProvider>
      <Home />
    </DataContextProvider>
  );
}

export default App;