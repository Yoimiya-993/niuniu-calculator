
export interface Card {
  value: number; // A=1, 2-9=2-9, 10/J/Q/K=10
  display: string; // 'A', '2', '3', ..., '10', 'J', 'Q', 'K'
  suit?: string; // Optional suit
  id: string; // Unique ID for selection
}

export interface CardResult {
  type: string; // 'bomb', 'five-small', 'five-flower', 'four-flower', 'niuniu', 'niu9', ... 'no-niu'
  typeDisplay: string; // Chinese display name
  multiplier: number;
  combination: Card[]; // The 5 cards in order (e.g., 3 for niu + 2)
  description: string;
}

export type CardType =
  | 'bomb'
  | 'five-small'
  | 'five-flower'
  | 'four-flower'
  | 'niuniu'
  | 'niu9'
  | 'niu8'
  | 'niu7'
  | 'niu6'
  | 'niu5'
  | 'niu4'
  | 'niu3'
  | 'niu2'
  | 'niu1'
  | 'no-niu';

export const CARD_TYPE_CONFIG: Record<string, { display: string; multiplier: number; score: number }> = {
  'bomb': { display: '炸弹', multiplier: 10, score: 100 },
  'five-small': { display: '五小', multiplier: 9, score: 90 },
  'five-flower': { display: '五花', multiplier: 8, score: 80 },
  'four-flower': { display: '四花', multiplier: 7, score: 70 },
  'niuniu': { display: '牛牛', multiplier: 5, score: 60 },
  'niu9': { display: '牛九', multiplier: 4, score: 59 },
  'niu8': { display: '牛八', multiplier: 3, score: 58 },
  'niu7': { display: '牛七', multiplier: 2, score: 57 },
  'niu6': { display: '牛六', multiplier: 2, score: 56 },
  'niu5': { display: '牛五', multiplier: 2, score: 55 },
  'niu4': { display: '牛四', multiplier: 2, score: 54 },
  'niu3': { display: '牛三', multiplier: 2, score: 53 },
  'niu2': { display: '牛二', multiplier: 2, score: 52 },
  'niu1': { display: '牛一', multiplier: 2, score: 51 },
  'no-niu': { display: '无牛', multiplier: 1, score: 0 },
};
