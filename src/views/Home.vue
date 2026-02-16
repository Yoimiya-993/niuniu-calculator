<script setup lang="ts">
import { useGameStore } from '../store/game';
import { storeToRefs } from 'pinia';
import CardSelector from '../components/CardSelector.vue';
import CalculateButton from '../components/CalculateButton.vue';
import ResultDisplay from '../components/ResultDisplay.vue';
import { RouterLink } from 'vue-router';

const store = useGameStore();
const { result } = storeToRefs(store);
</script>

<template>
  <div class="home-container">
    <div class="header">
      <h1>牛牛计算器</h1>
      <router-link to="/rules" class="rules-link">规则说明</router-link>
    </div>
    
    <div class="game-area">
      <CardSelector />
      
      <div class="action-area">
        <CalculateButton />
      </div>
    </div>

    <transition name="fade">
      <div v-if="result" class="result-overlay" @click.self="store.reset()">
        <ResultDisplay />
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: radial-gradient(circle at center, #8b0000 0%, #2c0000 100%);
  color: white;
  position: relative;
  overflow-x: hidden;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
  padding: 0 10px;
  
  h1 {
    font-size: 32px;
    margin: 0;
    color: #ffd700;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    font-weight: 900;
    letter-spacing: 1px;
  }
  
  .rules-link {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    transition: all 0.2s;
    backdrop-filter: blur(5px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-color: white;
      transform: translateY(-2px);
    }
  }
}

.game-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  max-width: 800px;
  flex: 1;
  justify-content: center;
}

.result-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(5px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
