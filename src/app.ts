import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { StopwatchScreen } from './components/StopwatchScreen';

// Disable development mode for better performance
Object.defineProperty(global, '__DEV__', { value: false });

// Register entry component
ReactNativeScript.registerElement(
  'StopwatchScreen',
  () => require('./components/StopwatchScreen').StopwatchScreen
);

// Start the app
ReactNativeScript.start(React.createElement(StopwatchScreen, {}, null));