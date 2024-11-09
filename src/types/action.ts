/**
 * Tipos relacionados ao registro de ações
 *
 * Define as estruturas de dados para o sistema de registro de ações.
 *
 * ActionType:
 * - 'ALERT': Indica um alerta de nível crítico
 * - 'COLLECTION': Indica uma coleta realizada
 */
export type ActionType = 'ALERT' | 'COLLECTION';

/**
 * Interface Action
 *
 * Define a estrutura completa de uma ação registrada.
 *
 * @property {string} id - Identificador único da ação
 * @property {ActionType} type - Tipo da ação
 * @property {number} stationId - ID da estação relacionada
 * @property {string} stationName - Nome da estação
 * @property {Date} timestamp - Data/hora do registro
 * @property {number} occupancyPercentage - Nível de ocupação no momento da ação
 */
export interface Action {
  id: string;
  type: ActionType;
  stationId: number;
  stationName: string;
  timestamp: Date;
  occupancyPercentage: number;
}
