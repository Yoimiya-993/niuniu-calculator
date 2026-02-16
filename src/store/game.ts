import { defineStore } from 'pinia';
import { calculateNiu } from '../utils/calculator';
import type { Card, CardResult } from '../types';

export const useGameStore = defineStore('game', {
  state: () => ({
    selectedCards: [] as Card[],
    result: null as CardResult | null,
    isCalculating: false,
  }),
  actions: {
    addCard(rank: string) {
      if (this.selectedCards.length >= 5) return;
      
      // Find available suits for this rank to ensure uniqueness and visual appeal
      const usedSuits = this.selectedCards
        .filter(c => c.display === rank)
        .map(c => c.suit);
      
      const allSuits = ['♠', '♥', '♣', '♦'];
      const availableSuit = allSuits.find(s => !usedSuits.includes(s));
      
      if (!availableSuit) return; // Already have 4 of this rank

      // Calculate value (A=1, 2-9, 10/J/Q/K=10)
      let value = 0;
      if (['J', 'Q', 'K', '10'].includes(rank)) {
        value = 10;
      } else if (rank === 'A') {
        value = 1;
      } else {
        value = parseInt(rank);
      }
      
      const newCard: Card = {
        id: Math.random().toString(36).substr(2, 9),
        display: rank,
        value: value,
        suit: availableSuit
      };
      
      this.selectedCards.push(newCard);
      this.result = null;
    },
    removeCard(index: number) {
      this.selectedCards.splice(index, 1);
      this.result = null;
    },
    async calculate() {
      if (this.selectedCards.length !== 5) return;
      this.isCalculating = true;
      
      // Simulate calculation delay for UX
      await new Promise(resolve => setTimeout(resolve, 600));
      
      try {
        this.result = calculateNiu(this.selectedCards);
      } catch (e) {
        console.error(e);
      } finally {
        this.isCalculating = false;
      }
    },
    reset() {
      this.selectedCards = [];
      this.result = null;
    }
  },
  getters: {
    canCalculate: (state) => state.selectedCards.length === 5,
    // Helper to check if a rank is maxed out (4 cards)
    isRankMaxed: (state) => (rank: string) => {
      return state.selectedCards.filter(c => c.display === rank).length >= 4;
    }
  }
});
