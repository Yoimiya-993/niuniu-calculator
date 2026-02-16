<template>
  <div class="card-selector">
    <!-- Selected Hand -->
    <div class="selected-hand">
      <div v-for="(card, index) in selectedCards" :key="card.id" class="hand-card-wrapper">
        <CardItem :card="card" @click="store.removeCard(index)" />
        <div class="remove-hint">点击移除</div>
      </div>
      <!-- Placeholders -->
      <div v-for="i in (5 - selectedCards.length)" :key="`placeholder-${i}`" class="card-placeholder">
        <span class="plus-icon">+</span>
      </div>
    </div>

    <!-- Rank Selector -->
    <div class="rank-grid">
      <button 
        v-for="rank in ranks" 
        :key="rank"
        class="rank-btn"
        :disabled="store.isRankMaxed(rank) || selectedCards.length >= 5"
        @click="store.addCard(rank)"
      >
        {{ rank }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../store/game';
import { storeToRefs } from 'pinia';
import CardItem from './CardItem.vue';

const store = useGameStore();
const { selectedCards } = storeToRefs(store);

const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
</script>

<style scoped lang="scss">
.card-selector {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 800px;
  align-items: center;
}

.selected-hand {
  display: flex;
  justify-content: center;
  gap: 8px;
  min-height: 100px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  backdrop-filter: blur(5px);
  width: 100%;
  max-width: 600px;
  flex-wrap: wrap;
}

.hand-card-wrapper {
  position: relative;
  
  .remove-hint {
    position: absolute;
    bottom: -24px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    color: rgba(255, 255, 255, 0.8);
    opacity: 0;
    transition: opacity 0.2s;
    white-space: nowrap;
    pointer-events: none;
  }

  &:hover .remove-hint {
    opacity: 1;
  }
}

.card-placeholder {
  width: 60px;
  height: 84px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.3);
  transition: all 0.2s;
  
  .plus-icon {
    font-size: 24px;
  }
  
  &:hover {
    border-color: rgba(255, 215, 0, 0.6);
    color: rgba(255, 215, 0, 0.6);
  }
}

.rank-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); // 5 cols on mobile
  gap: 8px;
  padding: 10px;
  width: 100%;
  max-width: 600px;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(7, 1fr); // 7 cols on larger screens
    gap: 12px;
  }
}

.rank-btn {
  background: white;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 18px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    background: #ffd700;
    color: #b22222;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #e0e0e0;
    color: #999;
  }
}

// Responsive for card size in hand
@media (min-width: 768px) {
  .card-placeholder {
    width: 80px;
    height: 112px;
  }
}
</style>
