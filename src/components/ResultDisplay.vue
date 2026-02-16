<template>
  <div v-if="result" class="result-display" :class="resultClass">
    <div class="result-header">
      <h2 class="result-title">{{ result.typeDisplay }}</h2>
      <div class="result-multiplier">x{{ result.multiplier }}</div>
    </div>
    
    <div class="result-cards">
      <!-- If it's a Niu type, split into 3+2 -->
      <template v-if="hasNiuSplit">
        <div class="card-group niu-base">
          <CardItem v-for="card in niuBaseCards" :key="card.id" :card="card" />
        </div>
        <div class="plus-sign">+</div>
        <div class="card-group niu-remainder">
          <CardItem v-for="card in niuRemainderCards" :key="card.id" :card="card" />
        </div>
      </template>
      <!-- Otherwise show all 5 together -->
      <div class="card-group full-hand" v-else>
        <CardItem v-for="card in result.combination" :key="card.id" :card="card" />
      </div>
    </div>
    
    <p class="result-desc">{{ result.description }}</p>
    
    <button class="reset-btn" @click="store.reset()">再来一把</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGameStore } from '../store/game';
import { storeToRefs } from 'pinia';
import CardItem from './CardItem.vue';

const store = useGameStore();
const { result } = storeToRefs(store);

const hasNiuSplit = computed(() => {
  if (!result.value) return false;
  const type = result.value.type;
  // Check if it's a type that uses 3+2 logic (niuniu, niu1-9)
  return type.startsWith('niu');
});

const niuBaseCards = computed(() => result.value?.combination.slice(0, 3) || []);
const niuRemainderCards = computed(() => result.value?.combination.slice(3, 5) || []);

const resultClass = computed(() => {
  if (!result.value) return '';
  if (result.value.multiplier >= 5) return 'is-high-value'; // Bomb, 5 Small, 5 Flower, NiuNiu
  if (result.value.multiplier > 1) return 'is-win';
  return 'is-normal';
});
</script>

<style scoped lang="scss">
.result-display {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  border: 2px solid #ffd700;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  width: 100%;
  max-width: 600px;
  position: relative;
  z-index: 100;
}

.result-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.result-title {
  font-size: 42px;
  color: #ffd700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  font-weight: 900;
  letter-spacing: 2px;
}

.result-multiplier {
  background: #e63946;
  color: white;
  padding: 4px 12px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transform: rotate(5deg);
}

.result-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.card-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
}

.plus-sign {
  color: #ffd700;
  font-size: 32px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.result-desc {
  color: #eee;
  font-size: 18px;
  margin-bottom: 32px;
  font-style: italic;
  opacity: 0.9;
}

.reset-btn {
  background: transparent;
  border: 2px solid #ffd700;
  color: #ffd700;
  padding: 12px 36px;
  border-radius: 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #ffd700;
    color: #8b0000;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  }
}

.is-high-value {
  border-color: #ff4500;
  box-shadow: 0 0 50px rgba(255, 69, 0, 0.5);
  
  .result-title {
    background: linear-gradient(to bottom, #ffd700, #ff4500);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 56px;
    animation: pulse 1.5s infinite;
  }
}

@keyframes popIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

// Responsive
@media (max-width: 480px) {
  .result-display {
    padding: 24px 16px;
  }

  .result-cards {
    gap: 12px;
  }
  
  .result-title {
    font-size: 32px;
  }
}
</style>
