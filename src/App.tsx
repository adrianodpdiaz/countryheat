import { Home } from './pages/Home';
import { RandomCountryContextProvider } from './contexts/RandomCountryContext';
import { CountrySelectorContextProvider } from './contexts/CountrySelectorContext';
import { ScoreContextProvider } from './contexts/ScoreContextProvider';
import { GameOverContextProvider } from './contexts/GameOverContextProvider';

function App() {
  return (
    <GameOverContextProvider>
      <ScoreContextProvider>
        <CountrySelectorContextProvider>
          <RandomCountryContextProvider>
            <Home />
          </RandomCountryContextProvider>
        </CountrySelectorContextProvider>
      </ScoreContextProvider>
    </GameOverContextProvider>
  );
}

export default App;