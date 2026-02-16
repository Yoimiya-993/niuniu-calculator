<template>
  <button 
    class="calculate-btn"
    :disabled="!canCalculate || isCalculating"
    @click="store.calculate()"
  >
    <span v-if="isCalculating" class="loader"></span>
    <span v-else>算 牛</span>
  </button>
</template>

<script setup lang="ts">
import { useGameStore } from '../store/game';
import { storeToRefs } from 'pinia';

const store = useGameStore();
const { canCalculate, isCalculating } = storeToRefs(store);
</script>

<style scoped lang="scss">
.calculate-btn {
  background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
  color: #8b0000;
  border: none;
  border-radius: 50px;
  padding: 16px 64px;
  font-size: 24px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 4px;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.4);

  &:disabled {
    background: #2c2c2c;
    color: #666;
    cursor: not-allowed;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
    border: 1px solid #444;
  }

  &:not(:disabled):hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.5);
    filter: brightness(1.1);
  }

  &:not(:disabled):active {
    transform: scale(0.95) translateY(0);
    box-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
  }
}

.loader {
  width: 24px;
  height: 24px;
  border: 3px solid #8b0000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
