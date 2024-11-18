export interface Swimmer {
  id: string;
  name: string;
  laps: number[];
  targetTime: number;
  interval: number;
  startTime: number;
}

export interface SwimmerWithTimes extends Swimmer {
  currentLapTime: number;
  totalTime: number;
  nextStartTime: number;
}