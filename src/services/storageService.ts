import { Action } from '../types/action';
import { Station } from '../types/station';

const STORAGE_KEYS = {
  STATIONS: '@b2blue:stations',
  ACTIONS: '@b2blue:actions',
  ALERTS: '@b2blue:alerts',
};

export const storageService = {
  saveStations(stations: Station[]) {
    localStorage.setItem(STORAGE_KEYS.STATIONS, JSON.stringify(stations));
  },

  getStations(): Station[] {
    const stored = localStorage.getItem(STORAGE_KEYS.STATIONS);
    return stored ? JSON.parse(stored) : null;
  },

  saveActions(actions: Action[]) {
    localStorage.setItem(STORAGE_KEYS.ACTIONS, JSON.stringify(actions));
  },

  getActions(): Action[] {
    const stored = localStorage.getItem(STORAGE_KEYS.ACTIONS);
    return stored ? JSON.parse(stored) : [];
  },

  saveAlerts(alerts: { [key: number]: boolean }) {
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
  },

  getAlerts(): { [key: number]: boolean } {
    const stored = localStorage.getItem(STORAGE_KEYS.ALERTS);
    return stored ? JSON.parse(stored) : {};
  },

  clearAll() {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  },
};
