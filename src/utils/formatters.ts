export const formatDateTime = (date: Date): string => {
  return new Date(date).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  });
};

export const formatPercentage = (value: number): string => {
  return `${value}%`;
};
