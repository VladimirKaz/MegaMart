<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { cartItems, isCartOpen, decrementQuantity, removeFromCart, addToCart } from '@/stores/cart';
import { computed } from 'vue';
import type { Product } from '@/types';

const $cartItems = useStore(cartItems); // Реактивный доступ к товарам
const $isOpen = useStore(isCartOpen);   // Реактивный доступ к состоянию панели

// 1. Превращаем объект в массив с правильной типизацией
const cartList = computed(() => {
  return Object.values($cartItems.value || {}) as (Product & { quantity: number })[];
});

// Вычисляем общую сумму (используем новый cartList)
const totalPrice = computed(() => {
  return cartList.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

// Проверка на пустоту
const hasItems = computed(() => {
  return cartList.value.length > 0;
});

const closeCart = () => {
  isCartOpen.set(false);
};
</script>

<template>
  <!-- ОБЕРТКА: Один корневой элемент (фрагмент), чтобы Astro не ругался -->
  <div>
    <!-- Оверлей -->
    <div v-if="$isOpen" class="overlay" @click="closeCart"></div>

    <!-- Сама корзина -->
    <div class="drawer" :class="{ 'is-open': $isOpen }">
      
      <div class="drawer-header">
        <h2>Ваша корзина</h2>
        <button @click="closeCart">✖</button>
      </div>

      <div class="drawer-body">
        <!-- Если корзина пуста: обращаемся к вычисляемому свойству hasItems -->
        <div v-if="!hasItems" class="empty-state">
          Корзина пуста
        </div>

        <!-- Если есть товары -->
        <div v-else>
          <div v-for="item in cartList" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.title" class="cart-item__img" />
        
            <div class="cart-item__info">
              <h4>{{ item.title }}</h4>
              <div class="cart-item__prices">
                <span class="price-current">{{ item.price }} ₹</span>
                <span v-if="item.oldPrice" class="price-old">{{ item.oldPrice }} ₹</span>
              </div>
            </div>

            <div class="cart-item__controls">
              <button @click="decrementQuantity(item.id)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="addToCart(item)">+</button>
              <button @click="removeFromCart(item.id)" class="btn-delete">✖</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="drawer-footer" v-if="hasItems">
        <p>Итого: {{ totalPrice }} ₹</p>
        <button class="checkout-btn">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Оверлей (затемнение) */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

/* Сама панель (шторка) */
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background-color: #fff;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  
  /* Анимация выезда */
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}

/* Открытое состояние панели */
.drawer.is-open {
  transform: translateX(0);
}

/* Внутренние элементы */
.drawer-header { 
  padding: 20px; 
  border-bottom: 1px solid #eee; 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
}

.drawer-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.drawer-body { 
  padding: 20px; 
  flex-grow: 1; 
  overflow-y: auto; 
}

.drawer-footer { 
  padding: 20px; 
  border-top: 1px solid #eee; 
}

.empty-state {
  text-align: center;
  color: #888;
  margin-top: 50px;
}

/* Карточка товара */
.cart-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.cart-item__img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.cart-item__info {
  flex-grow: 1;
}

.cart-item__info h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
}

.price-current {
  font-weight: bold;
  color: #1a56db;
}

.price-old {
  text-decoration: line-through;
  color: #999;
  font-size: 12px;
  margin-left: 5px;
}

/* Кнопки управления количеством */
.cart-item__controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cart-item__controls button {
  cursor: pointer;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
}

.btn-delete {
  background: transparent !important;
  color: #d9534f;
  font-size: 16px;
}

/* Кнопка "Оформить заказ" */
.checkout-btn {
  width: 100%;
  padding: 12px;
  background: #1a56db;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>