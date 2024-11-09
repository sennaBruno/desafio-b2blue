export interface Station {
  id: number;
  name: string;
  occupancyPercentage: number;
  status: 'normal' | 'warning' | 'collection-requested';
  lastCollectionDate?: Date;
}