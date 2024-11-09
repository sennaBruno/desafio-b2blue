import { Action } from '../types/action';
import { Station } from '../types/station';

export const validateStation = (station: Station): boolean => {
  return (
    typeof station.id === 'number' &&
    typeof station.name === 'string' &&
    typeof station.occupancyPercentage === 'number' &&
    station.occupancyPercentage >= 0 &&
    station.occupancyPercentage <= 100 &&
    (station.status === 'normal' || station.status === 'warning')
  );
};

export const validateAction = (action: Action): boolean => {
  return (
    typeof action.id === 'string' &&
    (action.type === 'ALERT' || action.type === 'COLLECTION') &&
    typeof action.stationId === 'number' &&
    typeof action.stationName === 'string' &&
    action.timestamp instanceof Date
  );
};
