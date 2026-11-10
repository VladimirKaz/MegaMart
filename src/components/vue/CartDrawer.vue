<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { cartItems, isCartOpen, decrementQuantity, removeFromCart, addToCart } from '@/stores/cart';
import { computed } from 'vue';

const $cartItems = useStore(cartItems); // Реактивный доступ к товарам
const $isOpen = useStore(isCartOpen);   // Реактивный доступ к состоянию панели

// Вычисляем общую сумму
const totalPrice = computed(() => {
  return Object.values($cartItems.value).reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const closeCart = () => {
  isCartOpen.set(false);
};
</script>

<template>
  <!-- Оверлей -->
  <div v-if="$isOpen" class="overlay" @click="closeCart"></div>

  <div class="drawer" :class="{ 'is-open': $isOpen }">
    
    <div class="drawer-header">
      <h2>Ваша корзина</h2>
      <!-- Кнопка закрытия -->
      <button @click="closeCart">✖</button>
    </div>

    <div class="drawer-body">
      <!-- Если корзина пуста -->
      <div v-if="Object.keys($cartItems).length === 0">
        Корзина пуста
      </div>

      <!-- Если есть товары -->
      <div v-else>
        <div v-for="item in $cartItems" :key="item.id" class="cart-item">
          <!-- Картинка товара -->
          <img :src="item.image" :alt="item.title" class="cart-item__img" />
      
          <!-- Информация -->
          <div class="cart-item__info">
            <h4>{{ item.title }}</h4>
            <div class="cart-item__prices">
              <!-- Текущая цена -->
              <span class="price-current">{{ item.price }} ₹</span>
              <!-- Старая цена (если есть) -->
              <span v-if="item.oldPrice" class="price-old">{{ item.oldPrice }} ₹</span>
            </div>
          </div>

          <!-- Кнопки управления (плюс/минус/удалить) -->
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
    <div class="drawer-footer" v-if="Object.keys($cartItems).length > 0">
      <p>Итого: {{ totalPrice }} ₹</p>
      <button>Оформить заказ</button>
    </div>
  </div>
</template>

<style scoped>
/* Стили для выезжающей панели */
.drawer {
  position: fixed;
  top: 0;
  right: -400px; /* Изначально спрятана за правым краем экрана */
  width: 400px; /* Ширина корзины */
  height: 100vh;
  background-color: #fff;
  box-shadow: -5px 0 15px rgba(0,0,0,0.1); /* Тень слева */
  transition: right 0.3s ease-in-out; /* Плавная анимация выезда */
  z-index: 1000; /* Поверх всего */
  display: flex;
  flex-direction: column;
}

/* Когда корзина открыта (класс добавляется через Vue) */
.drawer.is-open {
  right: 0; /* Выезжает на экран */
}

/* Простые стили для внутренностей (можешь заменить своими) */
.drawer-header { padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
.drawer-body { padding: 20px; flex-grow: 1; overflow-y: auto; }
.drawer-footer { padding: 20px; border-top: 1px solid #eee; }
.cart-item { margin-bottom: 15px; display: flex; flex-direction: column; gap: 5px;}
.controls { display: flex; gap: 10px; }

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

/* Оверлей */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный черный фон */
  z-index: 999; /* Чуть ниже, чем сама корзина (у неё 1000) */
  /* Опционально: плавное появление */
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>