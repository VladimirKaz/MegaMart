<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { computed } from 'vue';
import { cartItems, isCartOpen } from '@/stores/cart'; // 1. Импортируем стор открытия

const $cartItems = useStore(cartItems);
const totalItems = computed(() => {
  return Object.values($cartItems.value).reduce((sum, item) => sum + item.quantity, 0);
});

// 2. Функция для открытия корзины
const handleOpen = () => {
  isCartOpen.set(true);
};
</script>

<template>
  <!-- 3. Оборачиваем в button, вешаем клик и ставим type="button" -->
  <button class="cart-btn" @click="handleOpen" type="button" aria-label="Открыть корзину">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.42226 19.8203C7.84426 19.8203 8.18726 20.1633 8.18726 20.5853C8.18726 21.0073 7.84426 21.3493 7.42226 21.3493C7.00026 21.3493 6.65826 21.0073 6.65826 20.5853C6.65826 20.1633 7.00026 19.8203 7.42226 19.8203Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#008ECC" />
      <path d="M18.6747 19.8203C19.0967 19.8203 19.4397 20.1633 19.4397 20.5853C19.4397 21.0073 19.0967 21.3493 18.6747 21.3493C18.2527 21.3493 17.9097 21.0073 17.9097 20.5853C17.9097 20.1633 18.2527 19.8203 18.6747 19.8203Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#008ECC" />
      <path d="M2.74988 3.25L4.82988 3.61L5.79288 15.083C5.87088 16.018 6.65188 16.736 7.58988 16.736H18.5019C19.3979 16.736 20.1579 16.078 20.2869 15.19L21.2359 8.632C21.3529 7.823 20.7259 7.099 19.9089 7.099H5.16388" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#008ECC" />
      <path d="M14.1254 10.795H16.8984" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#008ECC" />
    </svg>

    <!-- Cart -->
    <span class="cart-text">Cart</span>

    <!-- Бейджик -->
    <span v-if="totalItems > 0" class="cart-badge">
      {{ totalItems }}
    </span>
  </button>
</template>

<style scoped>
/* Добавляем стили для самой кнопки, чтобы она не выглядела как стандартная кнопка браузера */
.cart-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  gap: 6px;
}

/* Бейджик */
.cart-badge {
  position: absolute;
  top: -8px;
  right: -12px;
  background-color: #1a56db;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-text {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 16px;
  line-height: 113%;
  color: var(--color-text-secondary);
}

.cart-btn:hover .cart-text {
  color: var(--color-primary);
}

@media (max-width: 1024px) {
  .cart-text {
    display: none;
  }
}
</style>