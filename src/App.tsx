import React from 'react';
import { StopwatchProvider } from './contexts/StopwatchContext';
import { StopwatchScreen } from './components/StopwatchScreen';

function App() {
  return (
    <StopwatchProvider>
      <StopwatchScreen />
    </StopwatchProvider>
  );
}

export default App;