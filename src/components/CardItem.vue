<template>
  <div 
    class="card-item" 
    :class="{ 'is-red': isRed, 'is-selected': selected }"
    @click="emit('click')"
  >
    <div class="card-corner top-left">
      <div class="card-rank">{{ card.display }}</div>
      <div class="card-suit">{{ card.suit }}</div>
    </div>
    <div class="card-center">
      {{ card.suit }}
    </div>
    <div class="card-corner bottom-right">
      <div class="card-rank">{{ card.display }}</div>
      <div class="card-suit">{{ card.suit }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Card } from '../types';

const props = defineProps<{
  card: Card;
  selected?: boolean;
}>();

const emit = defineEmits(['click']);

const isRed = computed(() => ['♥', '♦'].includes(props.card.suit || ''));
</script>

<style scoped lang="scss">
.card-item {
  width: 60px;
  height: 84px;
  background: white;
  border-radius: 6px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
  
  &.is-red {
    color: #e63946;
  }
  
  &:not(.is-red) {
    color: #1d3557;
  }

  &.is-selected {
    border: 2px solid #ffd700;
    box-shadow: 0 0 12px rgba(255, 215, 0, 0.6);
    transform: translateY(-8px);
    z-index: 10;
  }

  &:hover:not(.is-selected) {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  .card-corner {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    line-height: 1;
    font-weight: bold;
    
    &.bottom-right {
      transform: rotate(180deg);
    }
  }

  .card-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 28px;
  }
}

// Responsive adjustments
@media (min-width: 768px) {
  .card-item {
    width: 80px;
    height: 112px;
    padding: 6px;

    .card-corner {
      font-size: 14px;
    }

    .card-center {
      font-size: 36px;
    }
  }
}
</style>
