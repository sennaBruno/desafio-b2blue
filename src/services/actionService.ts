import { Action } from '../types/action';
import { storageService } from './storageService';

class ActionService {
  private actions: Action[] = [];

  constructor() {
    this.actions = storageService.getActions();
  }

  registerAction(action: Omit<Action, 'id' | 'timestamp'>) {
    const newAction = {
      ...action,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };

    this.actions = [...this.actions, newAction];
    storageService.saveActions(this.actions);
    return newAction;
  }

  getActions() {
    return this.actions;
  }

  clearActions() {
    this.actions = [];
    storageService.saveActions(this.actions);
  }
}

export const actionService = new ActionService();
