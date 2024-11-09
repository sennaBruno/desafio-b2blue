import { Action } from '../types/action';

/**
 * Serviço de Gerenciamento de Ações
 *
 * Responsável pelo registro e consulta de ações realizadas no sistema.
 * Implementa uma simulação de persistência de dados em memória.
 *
 * Funcionalidades:
 * - Registro de novas ações
 * - Consulta do histórico de ações
 * - Ordenação cronológica dos registros
 */
class ActionService {
  private actions: Action[] = [];

  /**
   * Registra uma nova ação no sistema
   * @param action - Dados da ação a ser registrada
   * @returns Action - Ação registrada com ID e timestamp
   */
  registerAction(action: Omit<Action, 'id' | 'timestamp'>) {
    const newAction = {
      ...action,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };

    this.actions.push(newAction);
    return newAction;
  }

  /**
   * Retorna todas as ações registradas, ordenadas por data
   * @returns Action[] - Array de ações ordenado
   */
  getActions() {
    return [...this.actions].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

export const actionService = new ActionService();
