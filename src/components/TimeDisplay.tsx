import React from 'react';
import { formatTime } from '../utils/timeFormatter';
import { useStopwatch } from '../contexts/StopwatchContext';

export const TimeDisplay = () => {
  const { totalTime, currentLapTime } = useStopwatch();

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mb-6">
      <div className="text-6xl font-mono font-bold text-center text-gray-800 dark:text-white mb-4">
        {formatTime(totalTime)}
      </div>
      <div className="text-3xl font-mono text-center text-gray-600 dark:text-gray-300">
        Lap: {formatTime(currentLapTime)}
      </div>
    </div>
  );
};