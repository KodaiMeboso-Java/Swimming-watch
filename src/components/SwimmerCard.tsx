import React, { useCallback, memo } from 'react';
import { useStopwatch } from '../contexts/StopwatchContext';
import { formatTime } from '../utils/timeFormatter';
import { SwimmerWithTimes } from '../types/swimmer';
import useSound from 'use-sound';

interface SwimmerCardProps {
  swimmer: SwimmerWithTimes;
}

export const SwimmerCard = memo(({ swimmer }: SwimmerCardProps) => {
  const { isRunning, recordLap } = useStopwatch();
  const [playBeep] = useSound('/sounds/beep.mp3', { volume: 0.5 });

  const handleLapRecord = useCallback(() => {
    if (isRunning) {
      recordLap(swimmer.id);
      playBeep();
    }
  }, [isRunning, recordLap, swimmer.id, playBeep]);

  const timeStatus = swimmer.currentLapTime > swimmer.targetTime ? 'text-red-500' : 'text-green-500';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{swimmer.name}</h3>
        <span className="text-sm text-gray-500">
          Next Start: {formatTime(swimmer.nextStartTime)}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Current Lap</p>
          <p className={`text-xl font-mono ${timeStatus}`}>
            {formatTime(swimmer.currentLapTime)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Time</p>
          <p className="text-xl font-mono">{formatTime(swimmer.totalTime)}</p>
        </div>
      </div>

      <button
        onClick={handleLapRecord}
        disabled={!isRunning}
        className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-colors ${
          isRunning
            ? 'bg-blue-500 hover:bg-blue-600'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Record Lap
      </button>
    </div>
  );
});