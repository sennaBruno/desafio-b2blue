import { createContext, useContext, useState, ReactNode } from 'react';
import { Station } from '../types/station';
import { mockStations } from '../services/stationService';
import { OCCUPANCY_THRESHOLD } from '../constants';

interface StationContextData {
  stations: Station[];
  alerts: { [key: number]: boolean };
  updateStationOccupancy: (stationId: number, newValue: number) => void;
  confirmCollection: (stationId: number) => void;
}

const StationContext = createContext<StationContextData>({} as StationContextData);

interface StationProviderProps {
  children: ReactNode;
}

export function StationProvider({ children }: StationProviderProps) {
  const [stations, setStations] = useState<Station[]>(mockStations);
  const [alerts, setAlerts] = useState<{ [key: number]: boolean }>({});

  const updateStationOccupancy = (stationId: number, newValue: number) => {
    setStations((prevStations) =>
      prevStations.map((station) =>
        station.id === stationId
          ? {
              ...station,
              occupancyPercentage: newValue,
              status: newValue >= OCCUPANCY_THRESHOLD ? 'warning' : 'normal',
            }
          : station
      )
    );

    if (newValue >= OCCUPANCY_THRESHOLD) {
      setAlerts((prev) => ({ ...prev, [stationId]: true }));
    }
  };

  const confirmCollection = (stationId: number) => {
    setStations((prevStations) =>
      prevStations.map((station) =>
        station.id === stationId
          ? { ...station, occupancyPercentage: 0, status: 'normal' }
          : station
      )
    );
    setAlerts((prev) => ({ ...prev, [stationId]: false }));
  };

  return (
    <StationContext.Provider
      value={{
        stations,
        alerts,
        updateStationOccupancy,
        confirmCollection,
      }}
    >
      {children}
    </StationContext.Provider>
  );
}

export function useStation() {
  const context = useContext(StationContext);

  if (!context) {
    throw new Error('useStation must be used within a StationProvider');
  }

  return context;
}
