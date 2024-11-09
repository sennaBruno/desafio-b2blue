/**
 * Interface Station
 *
 * Define a estrutura de dados de uma estação de resíduos.
 *
 * @property {number} id - Identificador único da estação
 * @property {string} name - Nome/identificação da estação
 * @property {number} occupancyPercentage - Nível atual de ocupação (0-100)
 * @property {'normal' | 'warning'} status - Estado atual da estação
 */
export interface Station {
  id: number;
  name: string;
  occupancyPercentage: number;
  status: 'normal' | 'warning';
}
