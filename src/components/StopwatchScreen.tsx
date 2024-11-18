import React from 'react';
import { TimeDisplay } from './TimeDisplay';
import { Controls } from './Controls';
import { SwimmerList } from './SwimmerList';
import { AddSwimmerDialog } from './AddSwimmerDialog';

export const StopwatchScreen = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold text-center">Swimming Stopwatch</h1>
      </header>
      <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full p-4">
        <TimeDisplay />
        <Controls />
        <div className="my-4">
          <AddSwimmerDialog />
        </div>
        <SwimmerList />
      </main>
    </div>
  );
};