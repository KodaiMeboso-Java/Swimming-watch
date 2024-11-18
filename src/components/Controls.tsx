import React from 'react';
import { useStopwatch } from '../contexts/StopwatchContext';

export const Controls = () => {
  const { isRunning, startStopwatch, stopStopwatch, recordLap, resetStopwatch } = useStopwatch();

  return (
    <div className="flex justify-center space-x-6 mb-8">
      <button
        className={`w-24 h-24 rounded-full text-white font-bold text-xl transition-colors ${
          isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        }`}
        onClick={() => (isRunning ? stopStopwatch() : startStopwatch())}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button
        className="w-24 h-24 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl transition-colors"
        onClick={() => (isRunning ? recordLap() : resetStopwatch())}
      >
        {isRunning ? 'Lap' : 'Reset'}
      </button>
    </div>
  );
};