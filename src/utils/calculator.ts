
import { CARD_TYPE_CONFIG } from '../types';
import type { Card, CardResult } from '../types';

const RANK_VALUE: Record<string, number> = {
  'A': 1, '2': 2, '3': 3, '4': 4, '5': 5,
  '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 11, 'Q': 12, 'K': 13
};

export function calculateNiu(cards: Card[]): CardResult {
  if (cards.length !== 5) {
    throw new Error('Must select 5 cards');
  }

  // Helper to check if cards are J/Q/K
  const isFlower = (c: Card) => ['J', 'Q', 'K'].includes(c.display);

  // 1. Bomb (4 cards same rank)
  // Check counts of each rank using display string
  const rankCounts: Record<string, number> = {};
  cards.forEach(c => {
    rankCounts[c.display] = (rankCounts[c.display] || 0) + 1;
  });
  const bombRank = Object.keys(rankCounts).find(r => rankCounts[r] === 4);

  if (bombRank) {
    // Put bomb cards first
    const bombCards = cards.filter(c => c.display === bombRank);
    const otherCard = cards.find(c => c.display !== bombRank)!;
    return {
      type: 'bomb',
      typeDisplay: CARD_TYPE_CONFIG['bomb'].display,
      multiplier: CARD_TYPE_CONFIG['bomb'].multiplier,
      combination: [...bombCards, otherCard],
      description: `四张${bombRank}，炸弹！`
    };
  }

  // 2. Five Small (Sum <= 10)
  const totalValue = cards.reduce((sum, c) => sum + c.value, 0);
  if (totalValue <= 10) {
    return {
      type: 'five-small',
      typeDisplay: CARD_TYPE_CONFIG['five-small'].display,
      multiplier: CARD_TYPE_CONFIG['five-small'].multiplier,
      combination: cards,
      description: `五张牌总和${totalValue}，五小牛！`
    };
  }

  // 3. Five Flower (All J/Q/K)
  if (cards.every(isFlower)) {
    return {
      type: 'five-flower',
      typeDisplay: CARD_TYPE_CONFIG['five-flower'].display,
      multiplier: CARD_TYPE_CONFIG['five-flower'].multiplier,
      combination: cards,
      description: '五张花牌，五花牛！'
    };
  }

  // 4. Four Flower (4 J/Q/K + 10)
  const flowerCount = cards.filter(isFlower).length;
  const tenCount = cards.filter(c => c.display === '10').length;
  if (flowerCount === 4 && tenCount === 1) {
    return {
      type: 'four-flower',
      typeDisplay: CARD_TYPE_CONFIG['four-flower'].display,
      multiplier: CARD_TYPE_CONFIG['four-flower'].multiplier,
      combination: cards, // Order usually doesn't matter for special types but good to sort
      description: '四张花牌一张十，四花牛！'
    };
  }

  // 5. Niu calculation
  // Find 3 cards that sum to multiple of 10.
  let bestResult: CardResult | null = null;

  // Iterate all combinations of 3 cards
  for (let i = 0; i < 5; i++) {
    for (let j = i + 1; j < 5; j++) {
      for (let k = j + 1; k < 5; k++) {
        const sum3 = cards[i].value + cards[j].value + cards[k].value;
        if (sum3 % 10 === 0) {
          // Found a bull base (3 cards)
          const remainingIndices = [0, 1, 2, 3, 4].filter(idx => ![i, j, k].includes(idx));
          const rem1 = cards[remainingIndices[0]];
          const rem2 = cards[remainingIndices[1]];
          const sum2 = rem1.value + rem2.value;
          const niuPoint = sum2 % 10 === 0 ? 10 : sum2 % 10;

          let type = '';
          if (niuPoint === 10) type = 'niuniu';
          else type = `niu${niuPoint}`;

          const result: CardResult = {
            type,
            typeDisplay: CARD_TYPE_CONFIG[type].display,
            multiplier: CARD_TYPE_CONFIG[type].multiplier,
            combination: [cards[i], cards[j], cards[k], rem1, rem2],
            description: `牛数：${niuPoint === 10 ? '牛牛' : niuPoint}`
          };

          const currentScore = CARD_TYPE_CONFIG[type].score;

          if (!bestResult) {
            bestResult = result;
          } else {
            const bestScore = CARD_TYPE_CONFIG[bestResult.type].score;
            if (currentScore > bestScore) {
              bestResult = result;
            } else if (currentScore === bestScore) {
              // Compare remaining cards (last 2 cards)
              // Current result remaining cards
              const currentMax = Math.max(RANK_VALUE[rem1.display], RANK_VALUE[rem2.display]);
              const currentMin = Math.min(RANK_VALUE[rem1.display], RANK_VALUE[rem2.display]);

              // Best result remaining cards
              const bestRem1 = bestResult.combination[3];
              const bestRem2 = bestResult.combination[4];
              const bestMax = Math.max(RANK_VALUE[bestRem1.display], RANK_VALUE[bestRem2.display]);
              const bestMin = Math.min(RANK_VALUE[bestRem1.display], RANK_VALUE[bestRem2.display]);

              // Compare max card first
              if (currentMax > bestMax) {
                bestResult = result;
              } else if (currentMax === bestMax) {
                // If max card is same, compare second card
                if (currentMin > bestMin) {
                  bestResult = result;
                }
              }
            }
          }
        }
      }
    }
  }

  if (bestResult) {
    return bestResult;
  }

  // 6. No Niu
  return {
    type: 'no-niu',
    typeDisplay: CARD_TYPE_CONFIG['no-niu'].display,
    multiplier: CARD_TYPE_CONFIG['no-niu'].multiplier,
    combination: cards,
    description: '没牛，下把再来！'
  };
}
