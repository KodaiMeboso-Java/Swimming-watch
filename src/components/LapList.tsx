import React from 'react';
import { formatTime } from '../utils/timeFormatter';
import { useStopwatch } from '../contexts/StopwatchContext';

export const LapList = () => {
  const { laps } = useStopwatch();

  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {laps.map((lap) => (
            <div
              key={lap.number}
              className="grid grid-cols-3 p-4 text-sm md:text-base"
            >
              <div className="text-gray-600 dark:text-gray-300">
                Lap {lap.number}
              </div>
              <div className="text-right font-mono text-gray-800 dark:text-white">
                {formatTime(lap.lapTime)}
              </div>
              <div className="text-right font-mono text-gray-600 dark:text-gray-300">
                {formatTime(lap.totalTime)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};