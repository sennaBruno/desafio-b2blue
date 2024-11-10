import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Station } from '../types/station';
import { mockStations } from '../services/stationService';
import { OCCUPANCY_THRESHOLD } from '../constants';
import { useNotification } from './NotificationContext';
import { Action } from '../types/action';
import { storageService } from '../services/storageService';
import { MESSAGES } from '../constants/messages';
import { actionService } from '../services/actionService';

interface StationContextData {
  stations: Station[];
  alerts: { [key: number]: boolean };
  actions: Action[];
  updateStationOccupancy: (stationId: number, newValue: number) => void;
  confirmCollection: (stationId: number) => void;
}

const StationContext = createContext<StationContextData>({} as StationContextData);

interface StationProviderProps {
  children: ReactNode;
}

/**
 * Contexto de Estações
 *
 * Gerencia o estado global das estações de resíduos, incluindo:
 * - Lista de estações ativas
 * - Sistema de alertas
 * - Registro de ações (coletas e alertas)
 * - Notificações do sistema
 */
export function StationProvider({ children }: StationProviderProps) {
  const [stations, setStations] = useState<Station[]>(() => {
    const stored = storageService.getStations();
    return stored || mockStations;
  });

  const [alerts, setAlerts] = useState<{ [key: number]: boolean }>(() => {
    return storageService.getAlerts();
  });

  const [actions, setActions] = useState<Action[]>(() => {
    return storageService.getActions();
  });

  const { showNotification } = useNotification();

  useEffect(() => {
    storageService.saveStations(stations);
  }, [stations]);

  useEffect(() => {
    storageService.saveAlerts(alerts);
  }, [alerts]);

  useEffect(() => {
    storageService.saveActions(actions);
  }, [actions]);

  const updateStationOccupancy = (stationId: number, newValue: number) => {
    const station = stations.find((s) => s.id === stationId);
    const previousValue = station?.occupancyPercentage || 0;

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

    if (previousValue < OCCUPANCY_THRESHOLD && newValue >= OCCUPANCY_THRESHOLD) {
      setAlerts((prev) => ({ ...prev, [stationId]: true }));
      actionService.registerAction({
        type: 'ALERT',
        stationId,
        stationName: station?.name || '',
        occupancyPercentage: newValue,
      });
      setActions(actionService.getActions());
      showNotification(MESSAGES.COLLECTION_ALERT(station?.name || ''), 'warning');
    } else if (previousValue >= OCCUPANCY_THRESHOLD && newValue < OCCUPANCY_THRESHOLD) {
      setAlerts((prev) => ({ ...prev, [stationId]: false }));
    }
  };

  const confirmCollection = (stationId: number) => {
    const station = stations.find((s) => s.id === stationId);
    const currentOccupancy = station?.occupancyPercentage || 0;

    setStations((prevStations) =>
      prevStations.map((station) =>
        station.id === stationId
          ? { ...station, occupancyPercentage: 0, status: 'normal' }
          : station
      )
    );
    setAlerts((prev) => ({ ...prev, [stationId]: false }));
    actionService.registerAction({
      type: 'COLLECTION',
      stationId,
      stationName: station?.name || '',
      occupancyPercentage: currentOccupancy,
    });
    setActions(actionService.getActions());
    showNotification(MESSAGES.COLLECTION_SUCCESS(station?.name || ''), 'success');
  };

  return (
    <StationContext.Provider
      value={{
        stations,
        alerts,
        actions,
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
