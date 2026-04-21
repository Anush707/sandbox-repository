export interface Magnet {
  id: string;
  word: string;
  status: 'bank' | 'fridge';
  x: number;
  y: number;
}