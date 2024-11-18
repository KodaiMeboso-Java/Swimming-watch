import React, { createContext, useContext, useCallback, useRef, useState, useEffect } from 'react';
import { useSwimmerStore } from '../store/useSwimmerStore';

interface StopwatchContextType {
  isRunning: boolean;
  totalTime: number;
  currentLapTime: number;
  startStopwatch: () => void;
  stopStopwatch: () => void;
  recordLap: (swimmerId: string) => void;
  resetStopwatch: () => void;
}

const StopwatchContext = createContext<StopwatchContextType | undefined>(undefined);

export const StopwatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [currentLapTime, setCurrentLapTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastLapTimeRef = useRef<number>(0);
  
  const { swimmers, recordLap: recordSwimmerLap } = useSwimmerStore();

  const startStopwatch = useCallback(() => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - totalTime;
      lastLapTimeRef.current = Date.now() - currentLapTime;
      
      intervalRef.current = window.setInterval(() => {
        const now = Date.now();
        setTotalTime(now - startTimeRef.current);
        setCurrentLapTime(now - lastLapTimeRef.current);
      }, 10);
      
      setIsRunning(true);
    }
  }, [isRunning, totalTime, currentLapTime]);

  const stopStopwatch = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const recordLap = useCallback((swimmerId: string) => {
    const currentTime = Date.now();
    const lapTime = currentTime - lastLapTimeRef.current;
    recordSwimmerLap(swimmerId, lapTime);
    lastLapTimeRef.current = currentTime;
    setCurrentLapTime(0);
  }, [recordSwimmerLap]);

  const resetStopwatch = useCallback(() => {
    stopStopwatch();
    setTotalTime(0);
    setCurrentLapTime(0);
    startTimeRef.current = 0;
    lastLapTimeRef.current = 0;
  }, [stopStopwatch]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const value = {
    isRunning,
    totalTime,
    currentLapTime,
    startStopwatch,
    stopStopwatch,
    recordLap,
    resetStopwatch,
  };

  return (
    <StopwatchContext.Provider value={value}>
      {children}
    </StopwatchContext.Provider>
  );
};

export const useStopwatch = () => {
  const context = useContext(StopwatchContext);
  if (context === undefined) {
    throw new Error('useStopwatch must be used within a StopwatchProvider');
  }
  return context;
};