<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { user, openAuth } from '@/stores/auth';

const currentUser = useStore(user);
const isMounted = ref(false);

// Ждем, пока компонент отрендерится в браузере
onMounted(() => {
  isMounted.value = true;
});

function handleClick() {
  if (!currentUser.value) {
    openAuth('login');
  } else {
    // TODO: тут можно открыть профиль или сделать logout
  }
}
</script>

<template>
  <!-- Пока не смонтировалось, рендерим заглушку (нейтральный текст) -->
  <button @click="handleClick" class="user-btn">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
    
    <!-- Показываем имя только после гидратации -->
    <span v-if="isMounted && currentUser">
      {{ currentUser.name }}
    </span>
    <span v-else>
      Sign Up/Sign In
    </span>
  </button>
</template>

<style scoped>
.user-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.user-btn:hover {
  color: var(--color-primary);
}
.user-btn svg {
  color: var(--color-primary);
}
@media (max-width: 1024px) {
  .user-btn span { display: none; }
}
</style>