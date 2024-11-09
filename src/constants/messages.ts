export const MESSAGES = {
  COLLECTION_NEEDED: 'Nível crítico! Coleta necessária.',
  COLLECTION_SUCCESS: (station: string) => `Coleta realizada com sucesso em ${station}!`,
  COLLECTION_ALERT: (station: string) =>
    `Pedido de coleta gerado para ${station}! Nível crítico de ocupação.`,
  COLLECTION_CONFIRM: (station: string) =>
    `Você está prestes a confirmar a coleta de resíduos da ${station}. Esta ação irá redefinir o nível de ocupação para 0%.`,
};
