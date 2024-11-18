import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useSwimmerStore } from '../store/useSwimmerStore';

export const AddSwimmerDialog = () => {
  const [name, setName] = useState('');
  const [interval, setInterval] = useState(5);
  const [targetTime, setTargetTime] = useState(30);
  const addSwimmer = useSwimmerStore((state) => state.addSwimmer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSwimmer({
      id: Date.now().toString(),
      name,
      interval,
      targetTime: targetTime * 1000,
      laps: [],
      startTime: 0,
    });
    setName('');
    setInterval(5);
    setTargetTime(30);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
          Add Swimmer
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Add New Swimmer
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Interval (seconds)
              </label>
              <input
                type="number"
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Target Time (seconds)
              </label>
              <input
                type="number"
                value={targetTime}
                onChange={(e) => setTargetTime(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                min="1"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};