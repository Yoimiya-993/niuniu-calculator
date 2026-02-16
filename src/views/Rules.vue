<template>
  <div class="rules-container">
    <div class="rules-header">
      <h1>牛牛规则说明</h1>
      <router-link to="/" class="back-link">返回计算器</router-link>
    </div>

    <div class="rules-content">
      <section class="rule-section">
        <h2>牌型大小与倍数</h2>
        <div class="rule-table">
          <div class="table-header">
            <span>牌型</span>
            <span>说明</span>
            <span class="text-right">倍数</span>
          </div>
          <div class="table-row" v-for="rule in rules" :key="rule.name">
            <span class="rule-name">{{ rule.name }}</span>
            <span class="rule-desc">{{ rule.desc }}</span>
            <span class="rule-mult">x{{ rule.mult }}</span>
          </div>
        </div>
      </section>

      <section class="rule-section">
        <h2>点数计算</h2>
        <ul>
          <li><strong>J / Q / K / 10</strong>：均记为 10 点</li>
          <li><strong>A</strong>：记为 1 点</li>
          <li><strong>2 - 9</strong>：记为牌面点数</li>
        </ul>
      </section>

      <section class="rule-section">
        <h2>玩法简介</h2>
        <p>每人发5张牌，其中3张牌相加之和必须是10的倍数（称为"牛基"），剩余2张牌相加之和的个位数即为牛数。若无牛基，则为无牛。</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const rules = [
  { name: '炸弹', desc: '四张相同点数的牌', mult: 10 },
  { name: '五小牛', desc: '五张牌点数总和≤10', mult: 9 },
  { name: '五花牛', desc: '五张牌全为J/Q/K', mult: 8 },
  { name: '四花牛', desc: '四张J/Q/K + 一张10', mult: 7 },
  { name: '牛牛', desc: '三张凑10，余下两张和为10的倍数', mult: 5 },
  { name: '牛九', desc: '余下两张和个位为9', mult: 4 },
  { name: '牛八', desc: '余下两张和个位为8', mult: 3 },
  { name: '牛一 ~ 牛七', desc: '余下两张和个位为1~7', mult: 2 },
  { name: '无牛', desc: '无法凑出10的倍数', mult: 1 },
];
</script>

<style scoped lang="scss">
.rules-container {
  min-height: 100vh;
  padding: 20px;
  background: #1a1a1a;
  color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.rules-header {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h1 {
    color: #ffd700;
    margin: 0;
    font-size: 24px;
  }
  
  .back-link {
    color: #ffd700;
    text-decoration: none;
    border: 1px solid #ffd700;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    transition: all 0.2s;
    
    &:hover {
      background: #ffd700;
      color: #1a1a1a;
    }
  }
}

.rules-content {
  width: 100%;
  max-width: 800px;
}

.rule-section {
  background: #2c2c2c;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  
  h2 {
    color: #ffd700;
    border-bottom: 1px solid #444;
    padding-bottom: 10px;
    margin-top: 0;
    font-size: 20px;
  }
  
  ul {
    padding-left: 20px;
    li {
      margin-bottom: 8px;
      line-height: 1.5;
    }
  }
  
  p {
    line-height: 1.6;
  }
}

.rule-table {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: #444;
  border-radius: 8px;
  overflow: hidden;
  font-size: 14px;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: 1.2fr 2fr 0.8fr;
  padding: 12px;
  gap: 10px;
  align-items: center;
}

.table-header {
  background: #333;
  font-weight: bold;
  color: #ffd700;
}

.table-row {
  background: #2c2c2c;
  
  &:nth-child(even) {
    background: #252525;
  }
}

.rule-name {
  font-weight: bold;
  color: #e63946;
}

.rule-desc {
  color: #ccc;
}

.rule-mult {
  text-align: right;
  font-weight: bold;
  color: #ffd700;
}

.text-right {
  text-align: right;
}

@media (min-width: 768px) {
  .rules-header h1 {
    font-size: 32px;
  }
  
  .rule-table {
    font-size: 16px;
  }
}
</style>
